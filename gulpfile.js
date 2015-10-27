'use strict';

let gulp = require('gulp-help')(require('gulp'));
let tsc = require('gulp-typescript');
let tslint = require('gulp-tslint');
let http = require('http');
let connect = require('connect');
let serveStatic = require('serve-static');
let open = require('open');
    
const DOCS = {
    typescriptBuild:    'Build TypeScript and compile out ES5 JavaScript',
    typescriptLint:     'Lint TypeScript to check for style and syntax errors.',
    watch:              'Start watching files for compilation and linting.',
    runDev:             'Start dev server and watch tasks.'
};

const SOURCE = {
    typescript: './app/**/*.ts'
}

gulp.task('lint.typescript', DOCS.typescriptLint, () => {
    return gulp.src(SOURCE.typescript).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('build.typescript', DOCS.typescriptBuild, [], () => {
    let tsResult = gulp.src([SOURCE.typescript, './typings/**/*.d.ts'])
                      .pipe(tsc({
                          typescript: require('typescript'),
                          target: 'ES5',
                          declarationFiles: false,
                          experimentalDecorators: true,
                          emitDecoratorMetadata: true,
                          module: 'system'
                      }));

    return tsResult.js
            .pipe(gulp.dest('./app/'));
});

gulp.task('watch', DOCS.watch, () => {
    gulp.watch(SOURCE.typescript, ['build.typescript']).on('error', catchError);
});

gulp.task('run.dev', DOCS.runDev, ['watch', 'build.typescript'], function () {
    let port = 9000, app;

    app = connect().use(serveStatic(__dirname));  // serve everything that is static
    
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

function catchError(err) {
    console.log(err);
    this.emit('end');
};