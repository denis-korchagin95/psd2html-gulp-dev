'use strict';

var $ = require('../load-packages');

module.exports = function(gulp, conig, options) {
	var pugOptions = $.lodashGet(options, 'pugOptions', {});
	return function(callback) {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(error) {
					return {
						title: 'Pug',
						message: error.message
					};
				})
			}))
			.pipe($.pug(pugOptions))
			.pipe(gulp.dest(options.dest));
	};
};