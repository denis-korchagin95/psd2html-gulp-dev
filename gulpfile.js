var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var del = require('del');
var browserSync = require('browser-sync').create();


gulp.task('clean', function() {
	return del('dist');
});


gulp.task('serve', function(callback) {
	browserSync.init({
		server: 'dist'
	});
	
	browserSync
		.watch('dist/**/*.*')
		.on('change', browserSync.reload);
});


gulp.task('stylus', function() {
	return gulp.src('src/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('dist/css'));
});


gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'));
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


gulp.task('build', gulp.series('clean', 'stylus', 'images', 'pug'));


gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));


gulp.task('default', gulp.series('dev'));