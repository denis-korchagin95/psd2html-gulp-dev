var gulp = require('gulp');
var pug = require('gulp-pug');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var del = require('del');


gulp.task('clean', function() {
	return del('dist');
});


gulp.task('connect', function(callback) {
	connect.server({
		port: 1337,
		livereload: true,
		root: './dist'
	});
	callback();
});


gulp.task('stylus', function() {
	return gulp.src('src/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});


gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});


gulp.task('images', function() {
	return gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('dist/images'));
});


gulp.task('watch', function(callback) {
	gulp.watch('src/pug/**/*.pug', gulp.series(['pug']));
	gulp.watch('src/stylus/**/*.styl', gulp.series(['stylus']));
	gulp.watch('src/images/**/*.*', gulp.series(['images']));
	callback();
});


gulp.task('default', gulp.series(
	'clean', 'pug', 'stylus', 'images',
	gulp.parallel('connect', 'watch')
));