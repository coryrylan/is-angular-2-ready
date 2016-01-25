module.exports = {
    app: { baseName: 'app' },
    sass: {
        src: ['./styles/**/*.scss'],
        lintSrc: [
            'styles/**/*',
            '!styles/libraries/**/*',
            '!styles/_grid.scss',
            '!styles/_normalize.scss'
        ]
    },
    typescript: {
        src: ['./app/**/*.ts', './app/**/*.spec.ts'],
        typings: ['./typings/**/*.d.ts']
    },
    images: {
        src: ['assets/images/**/*']
    },
    html: {
        src: ['./app/**/*.html', '!app/index.html'],
        rootSrc: './app/index.html',
        templateUrlReferences: ['build/app/**/*.js']
    },
    font: {
        src: ['./assets/fonts/**/*.*']
    },
    javascript: {
        src: [
            './assets/js/fetch/fetch.js',
            
            // Angular 2 Deps
            './node_modules/es6-shim/es6-shim.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/angular2/bundles/http.dev.js'
        ]
    },
    buildLocations: {
        html: './build/base/app/',
        index: './',
        typescript: './build/base/app/',
        css: './build/base/styles/',
        img: './build/base/assets/images/',
        js: './build/base/assets/javascript/',
        fonts: './build/base/assets/fonts/',
        clean: './build/base/**/*'
    }
}