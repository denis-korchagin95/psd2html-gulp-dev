'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulp/config');


function deferredTaskRequire(taskName, taskPath, taskOptions) {
	if( taskOptions == null )
		taskOptions = {};
	taskOptions._taskName = taskName;
	gulp.task(taskName, function(callback) {
		var task = require(taskPath).call(this, gulp, gulpConfig, taskOptions);
		return task(callback);
	});
}


deferredTaskRequire('serve', './gulp/tasks/serve.js');

deferredTaskRequire('clean', './gulp/tasks/clean.js', {
	folders: ['dist', 'manifest']
});

deferredTaskRequire('stylus', './gulp/tasks/stylus.js', {
	src: ['src/stylus/*.styl'],
	dest: 'dist/css',
	autoprefixerOptions: {
		browsers: ['last 4 version']
	},
	revReplaceQueue: [
		gulpConfig.manifestDir + '/images.json',
		gulpConfig.manifestDir + '/fonts.json'
	],
	manifestName: 'css.json'
});

deferredTaskRequire('pug', './gulp/tasks/pug.js', {
	src: 'src/pug/*.pug',
	dest: 'dist',
	revReplaceQueue: [
		gulpConfig.manifestDir + '/css.json',
		gulpConfig.manifestDir + '/js-vendor.json',
		gulpConfig.manifestDir + '/images.json'
	]
});

deferredTaskRequire('images', './gulp/tasks/images.js', {
	src: 'src/images/**/*.*',
	dest: 'dist/images',
	manifestName: 'images.json'
});


deferredTaskRequire('fonts', './gulp/tasks/fonts.js', {
	src: 'src/fonts/**/*.*',
	dest: 'dist/fonts',
	manifestName: 'fonts.json'
});


deferredTaskRequire('js:vendor', './gulp/tasks/js-vendor.js', {
	src: 'src/vendor/js/**/*.js',
	dest: 'dist/js/vendor',
	manifestName: 'js-vendor.json'
})


gulp.task('watch', function(callback) {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/stylus/**/*.styl', gulp.series('stylus'));
	gulp.watch('src/images/**/*.*', gulp.series('images'));
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
	gulp.watch('src/vendor/js/**/*.js', gulp.series('js:vendor'));
	callback();
});


gulp.task('assets', gulp.parallel('js:vendor', 'images', 'fonts'));


gulp.task('build', gulp.series('clean', 'assets', 'stylus', 'pug'));


gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));


gulp.task('default', gulp.series(gulpConfig.isDevelopment ? 'dev' : 'build'));