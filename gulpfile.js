/// <binding AfterBuild='build--dev' Clean='clean' ProjectOpened='watch' />
'use strict';

let gulp = require('gulp-help')(require('gulp'), { hideDepsMessage: true, afterPrintCallback: cliNotes });
let gulpUtil = require('gulp-util');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let del = require('del');
let sass = require('gulp-sass');
let sassLint = require('gulp-sass-lint');
let tsc = require('gulp-typescript');
let tslint = require('gulp-tslint');
let imagemin = require('gulp-imagemin');
let minifyHTML = require('gulp-minify-html');
let browserSync = require('browser-sync').create();
let replace = require('gulp-replace');
let inject = require('gulp-inject');
let changed = require('gulp-changed');
let runSequence = require('run-sequence');
let karmaServer = require('karma').server;
let merge = require('merge-stream');
let Stream = require('stream');

const CONFIGS = [require('./gulp.config')];

gulp.task('default', false, ['help']);

gulp.task('build', 'Production ready build for client code.', (done) => {
    gulpUtil.env.type = 'production';
    build(done);
});

gulp.task('build--dev', 'Development ready build for client code.', (done) => {
    gulpUtil.env.type = 'development';
    build(done);
});

gulp.task('watch', 'Watch source files for changes and build on update', ['_browser-sync'], () => {
    gulpUtil.env.type = 'development';

    let sassSrc = [];
    let htmlSrc = [];
    let typescriptSrc = [];
    let htmlRootSrc = [];

    CONFIGS.forEach(config => {
        sassSrc.push(config.sass.src);
        htmlSrc.push(config.html.src);
        typescriptSrc.push(config.typescript.src);
        htmlRootSrc.push(config.html.rootSrc);
    });

    gulp.watch(sassSrc, () => runSequence('_build.sass', '_update.version', '_sass-lint'));
    gulp.watch(htmlSrc, () => runSequence('_build.html', '_update.template-version', '_update.version', '_browser-sync-reload'));
    gulp.watch(typescriptSrc, () => runSequence('_build.typescript', '_update.template-version', '_update.version', '_browser-sync-reload')); // '_ts-lint'
    gulp.watch(htmlRootSrc, ['_update.version']);
});

gulp.task('clean', 'Clean the solution by removing any compiled files', (done) => {
    del(CONFIGS.map(config => config.buildLocations.clean), done);
});

gulp.task('tdd', 'Run unit tests for development', (done) => {
    karmaServer.start({ port: 9876, configFile: __dirname + '/karma.conf.js' }, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });
});

gulp.task('_test', 'Run unit tests for build', (done) => {
    karmaServer.start({ port: 9876, configFile: __dirname + '/karma.conf.js', singleRun: true }, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });
});

gulp.task('_ts-lint', 'Lint TypeScript for style & syntax errors', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.typescript.src).pipe(tslint()).pipe(tslint.report('prose').on('error', () => {}));
    });

    return merge(tasks);
});

gulp.task('_build.typescript', 'Build TypeScript and compile out ES5 JavaScript', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.typescript.src.concat(config.typescript.typings))
                      .pipe(tsc({
                          typescript: require('typescript'),
                          target: 'ES5',
                          declarationFiles: false,
                          experimentalDecorators: true,
                          emitDecoratorMetadata: true,
                          module: 'commonjs',
                          moduleResolution: 'node'
                      }))
                      .pipe(isProd() ? uglify() : gulpUtil.noop())
                      .pipe(gulp.dest(config.buildLocations.typescript))
                      .on('error', swallowError);
    });

    return merge(tasks);
});

gulp.task('_build.javascript', 'Build JavaScript and move to distribute', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.javascript.src)
            .pipe(changed(config.buildLocations.js))
            .pipe(isProd() ? uglify() : gulpUtil.noop())
            .pipe(gulp.dest(config.buildLocations.js));
    });

    return merge(tasks);
});

gulp.task('_sass-lint', 'Lint Sass to check for style errors', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.sass.lintSrc)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .on('error', swallowError);
    });

    return merge(tasks);
});

gulp.task('_build.sass', 'Build Sass and compile out CSS', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.sass.src)
            .pipe(isProd() ? sass({ outputStyle: 'compressed' }) : sass())
            .on('error', swallowError)
            .pipe(rename('app.min.css'))
            .pipe(gulp.dest(config.buildLocations.css))
            .pipe(browserSync.stream());
    });

    return merge(tasks);
});

gulp.task('_build.images', 'Compress and distribute images', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.images.src)
                .pipe(changed(config.buildLocations.img))
                .pipe(imagemin({
                    progressive: true
                }))
                .pipe(gulp.dest(config.buildLocations.img));
    });

    return merge(tasks);
});

gulp.task('_build.html', 'Minify and distribute HTML templates', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.html.src)
                .pipe(changed(config.buildLocations.html))
                .pipe(isProd() ? minifyHTML() : gulpUtil.noop())
                .pipe(gulp.dest(config.buildLocations.html));
    });

    return merge(tasks);
});

gulp.task('_build.fonts', 'Move fonts to build', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.font.src)
            .pipe(gulp.dest(config.buildLocations.fonts));
    });

    return merge(tasks);
});

gulp.task('_browser-sync', 'Start up browser sync localhost', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        logFileChanges: false
    });
});

gulp.task('_browser-sync-reload', 'Reload browsers connected to browser sync', () => {
    browserSync.reload();
});

gulp.task('_update.version', 'Create version for CSS/JS references', () => {
    let tasks = CONFIGS.map(config => {
        let target = gulp.src(config.html.rootSrc);
        let jsFiles = config.javascript.src.map(file => config.buildLocations.js + file.replace(/^.*[\\\/]/, ''));
        let cssFiles = config.buildLocations.css + '*.css';
        let sources = gulp.src([].concat(jsFiles, cssFiles), { read: false });

        return target
                .pipe(inject(sources, { transform: injectVersion, addRootSlash: false }))
                .pipe(replace(/<app-version>/g, getVersion()))
                .pipe(gulp.dest(config.buildLocations.index));
    });

    return merge(tasks);
});

gulp.task('_update.template-version', 'Create version for HTML template references', () => {
    let tasks = CONFIGS.map(config => {
        return gulp.src(config.html.templateUrlReferences)
                // Update referenced static template versions
                .pipe(replace(new RegExp(`templateUrl: '${config.app.baseName}/`), `templateUrl: '${config.buildLocations.html}`))
                .pipe(replace(/\.html/g, '.html?v=' + getVersion()))
                .pipe(gulp.dest(config.buildLocations.typescript));
    });

    return merge(tasks);
});

function build(done) {
    runSequence(
        'clean',
        ['_build.typescript', '_build.images', '_build.fonts', '_build.html', '_build.javascript', '_build.sass'], // , '_ts-lint' '_sass-lint'
        '_update.template-version',
		'_update.version', done);
}

function injectVersion(filepath) {
    arguments[0] = filepath + '?v=' + getVersion();
    return inject.transform.apply(inject.transform, arguments);
}

function swallowError(error) {
    console.log(error.toString());

    this.emit('end');
}

function isProd() {
    return gulpUtil.env.type === 'production';
}

function getVersion() {
    return new Date().getTime();
}

function cliNotes() {
    console.log('  * _tasks are private sub tasks. Only use if necessary. *\n\n\n');
}