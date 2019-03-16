'use strict';

var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function(callback) {
		browserSync.init({
			server: 'dist'
		});
	
		browserSync
			.watch('dist/**/*.*')
			.on('change', browserSync.reload);
	
		callback();
	};
};
