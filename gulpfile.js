'use strict';

/*
    This gulpfile is an 'outer' gulpfile that manages starting docker containers and watching/rebuilding files for dev purposes
    
    
```bash
gulp dev # prepares the dev environment
```

*/

require('es6-shim');

var spawn = require('child_process').spawn;
var path = require('path'); 
var join = path.join;

var browserify = require('browserify');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');



function bundleShare(b, name) {
    return new Promise(function(resolve, reject){
        b.bundle()
        .pipe(source( join('.', name)))
        .pipe(gulp.dest('.'))
        .on('error', function (err) {
            console.error('bundleShare error', err.message);
            reject(err);
        })
        .on('end', function(){
            console.log('Browserify bundle generated');
            resolve();
        });
    });
}

function browserifyShare(name){
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });
    
    b.add( join('.', 'js', name, 'main.js') );

    return bundleShare(b, 'browserify-bundle.js');
}

function tscDev(){

    return gulp.src(join('ts', '**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs',
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join('.', 'js')));
}

function tscProd(){ // doesn't generate sourcemaps

    return gulp.src(join('ts', '**/*.ts'))
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs'
        }))
        .pipe(gulp.dest(join('.', 'js')));
}

// Typescript compile and then browserify bundle the client
gulp.task('build-dev', ['tsc-dev'], function(){
    return browserifyShare('client');
});

gulp.task('build-prod', ['tsc-prod'], function(){
    return browserifyShare('client');
});

// Typescript compile
gulp.task('tsc-dev', function(){
    return tscDev();
});

gulp.task('tsc-prod', function(){
    return tscProd();
});

// Watch client
gulp.task('watch', ['build-dev'], function() {
    console.log('Watching client');
    
    // When a .js updates, Browserify bundle the client
    var jsClientWatcher = gulp.watch('./js/client/**/*.js', ['browserify-client']);
    jsClientWatcher.on('change', function(event) {
        console.log('** JS Client ** File ' + path.relative(__dirname, event.path) + ' was ' + event.type);
    });

    // When a .ts updates, Typescript compile the client
    var tsClientWatcher = gulp.watch('./ts/**/*.ts', ['tsc-client-dev']);
    tsClientWatcher.on('change', function(event) {
        console.log('** TS Client ** File ' + path.relative(__dirname, event.path) + ' was ' + event.type);
    });
});

// These are to spawn docker test instances, needed mainly for async tests that require the server being up

gulp.task('start-containers-test', function(){
    spawn('docker-compose', ['-f', 'compose-test.yml', 'up', '--force-recreate'], {stdio: 'inherit'});
});

/*
    Top-level tasks
*/

gulp.task('test', ['start-containers-test']);


