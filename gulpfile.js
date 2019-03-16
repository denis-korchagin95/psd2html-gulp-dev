'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulp/config');


function deferredTaskRequire(taskName, taskPath, taskOptions) {
	if( taskOptions == null )
		taskOptions = {};
	gulp.task(taskName, function(callback) {
		var task = require(taskPath).call(this, taskOptions);
		
		return task(callback);
	});
}


deferredTaskRequire('serve', './gulp/tasks/serve.js');

deferredTaskRequire('clean', './gulp/tasks/clean.js', {
	folders: ['dist']
});

deferredTaskRequire('stylus', './gulp/tasks/stylus.js', {
	src: ['src/stylus/*.styl'],
	dest: 'dist/css'
});

deferredTaskRequire('pug', './gulp/tasks/pug.js', {
	src: 'src/pug/*.pug',
	dest: 'dist'
});

deferredTaskRequire('images', './gulp/tasks/images.js', {
	src: 'src/images/**/*.*',
	dest: 'dist/images'
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