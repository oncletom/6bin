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

function browserifyShare(path){
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });
    
    b.add( path );

    return bundleShare(b, 'browserify-bundle.js');
}

function tscDev(glob){

    console.log('tscDev', glob);

    return gulp.src(glob)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs',
            outDir: glob
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join('.', 'js')));
}

function tscProd(glob){ // doesn't generate sourcemaps

    return gulp.src(join(glob))
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs'
        }))
        .pipe(gulp.dest(join('.', 'js')));
}

// Typescript compile and then browserify bundle the client
gulp.task('build-dev', ['tsc-dev'], function(){
    return browserifyShare('js/client/main.js');
});

gulp.task('build-prod', ['tsc-prod'], function(){
    return browserifyShare('js/client/main.js');
});

// Typescript compile
gulp.task('tsc-dev', function(){
    return tscDev('ts/**/*.ts');
});

gulp.task('tsc-prod', function(){
    return tscProd('ts/**/*.ts');
});

// Watch client
gulp.task('watch', ['build-dev'], function() {
    console.log('Watching client');
    
    // When a .js updates, Browserify bundle the client
    var jsClientWatcher = gulp.watch('./js/client/**/*.js');
    jsClientWatcher.on('change', function(event) {
        var file = path.relative(__dirname, event.path);
        console.log('** JS Client ** File ' + file + ' was ' + event.type);
        browserifyShare(file);
    });

    // When a .ts updates, Typescript compile the client
    var tsClientWatcher = gulp.watch('./ts/**/*.ts');
    tsClientWatcher.on('change', function(event) {
        var file = path.relative(__dirname, event.path);
        console.log('** TS Client ** File ' + file + ' was ' + event.type);
        tscDev(file);
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


