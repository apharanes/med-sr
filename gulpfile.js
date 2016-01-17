var through2 = require('through2'),
	gulp = require('gulp'),
	util = require('gulp-util'),
    tap = require('gulp-tap'),
    coffee = require('gulp-coffee'),
	reactify = require('reactify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	concat = require('gulp-concat');

gulp.task('default', ['watch']);

gulp.task('compile-coffee', function () {
    gulp.src('./assets/**/*.coffee')
    .pipe(coffee({ bare: true})).on('error', function (err) {
        console.log('Error compiling ' + err)
    })
    .pipe(tap(function (file) {
        console.log('Processing file: ' + file.path);
    }))
    .pipe(gulp.dest('./app'));
});
//
//gulp.task('compile-sass', function () {
//   gulp.src('./assets/**/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('./app'));
//});

//gulp.task('compile-jsdocs', function () {
//	gulp.src('./app/**/*.js')
//	.pipe(jsdoc('./docs'));
//});

gulp.task('browserify', function () {
	var bundler = browserify('./assets/public/js/main.js');
	bundler.transform(reactify);
	var stream = bundler.bundle();
	stream.pipe(source('main.js'))
	.pipe(gulp.dest('./app/public/js'));
});

gulp.task('default', ['compile-coffee', 'browserify', 'compile-jsdocs' ]);

gulp.task('watch', function () {
    gulp.watch('./assets/**/*.coffee', ['compile-coffee']);
	gulp.watch('./app/**/*.js', ['compile-jsdocs']);
	gulp.watch('./assets/public/js/**/*.js', ['browserify']);
});