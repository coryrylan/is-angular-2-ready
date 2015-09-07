'use strict';

var gulp = require('gulp-help')(require('gulp'));
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');

gulp.task('ts-lint', 'Lint TypeScript to check for style and syntax errors.', function () {
    return gulp.src('./app/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('build.typescript', 'Build TypeScript and compile out ES5 JavaScript', [], function () {
    var tsResult = gulp.src(['./app/**/*.ts', './typings/**/*.d.ts'])
                      .pipe(tsc({
                          typescript: require('typescript'),
                          target: 'ES5',
                          declarationFiles: false,
                          experimentalDecorators: true,
                          emitDecoratorMetadata: true,
                          module: 'commonjs'
                      }));

    return tsResult.js
            .pipe(gulp.dest('./app/'));
});