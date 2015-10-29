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

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var source = require('vinyl-source-stream');



function bundleShare(b, name) {
    return new Promise(function(resolve, reject){
        b.bundle()
        .pipe(source( join('.', 'client', name) ) )
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
    
    b.add( join('.', name, 'src', 'main.js') );

    return bundleShare(b, 'browserify-bundle.js');
}

function tscDev(name){

    return gulp.src(join(name, '**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join('.', name)));
}

function tscProd(name){ // doesn't generate sourcemaps

    return gulp.src(join(name, '**/*.ts'))
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs'
        }))
        .pipe(gulp.dest(join('.', name)));
}

// Browserify bundle the client
gulp.task('browserify-client', function(){
    return browserifyShare('client');
});

// Typescript compile and then browserify bundle the client
gulp.task('build-client-dev', ['tsc-client-dev'], function(){
    return browserifyShare('client');
});

gulp.task('build-client-prod', ['tsc-client-prod'], function(){
    return browserifyShare('client');
});

// Typescript compile the client
gulp.task('tsc-client-dev', function(){
    return tscDev('client');
});

gulp.task('tsc-client-prod', function(){
    return tscProd('client');
});

// Typescript compile the server
gulp.task('tsc-server-dev', function(){
    return tscDev('server');
});

gulp.task('tsc-server-prod', function(){
    return tscProd('server');
});

// Watch client
gulp.task('watch-client', ['build-dev'], function() {
    console.log('Watching client');
    
    // When a .js updates, Browserify bundle the client
    var jsClientWatcher = gulp.watch('./client/src/**/*.js', ['browserify-client']);
    jsClientWatcher.on('change', function(event) {
        console.log('** JS Client ** File ' + path.relative(__dirname, event.path) + ' was ' + event.type);
    });

    // When a .ts updates, Typescript compile the client
    var tsClientWatcher = gulp.watch('./client/src/**/*.ts', ['tsc-client-dev']);
    tsClientWatcher.on('change', function(event) {
        console.log('** TS Client ** File ' + path.relative(__dirname, event.path) + ' was ' + event.type);
    });
});

// Watch server
gulp.task('watch-server', ['build-dev'], function() {
    console.log('Watching server');

    // When a .ts updates, Typescript compile the server
    var tsClientWatcher = gulp.watch('./server/src/**/*.ts', ['tsc-server-dev']);
    tsClientWatcher.on('change', function(event) {
        console.log('** TS Server ** File ' + path.relative(__dirname, event.path) + ' was ' + event.type);
    });
});

gulp.task('watch', ['watch-client', 'watch-server']);
gulp.task('build-dev', ['build-client-dev', 'tsc-server-dev']);
gulp.task('build-prod', ['build-client-prod', 'tsc-server-prod']);

gulp.task('start-containers-dev', ['build-dev'], function(){
    spawn('docker-compose', ['-f', 'compose-dev.yml', 'up'], {stdio: 'inherit'});
});

gulp.task('start-containers-prod', ['build-prod'], function(){
    spawn('docker-compose', ['-f', 'compose-prod.yml', 'up', '-d'], {stdio: 'inherit'});
});

/*
    Top-level tasks
*/

gulp.task('dev', ['start-containers-dev', 'watch']);

gulp.task('prod', ['start-containers-prod']);


