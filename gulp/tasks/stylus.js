'use strict';

var $ = require('../load-packages');

module.exports = function(gulp, config, options) {
	var stylusOptions = $.lodashGet(options, 'stylusOptions', {});
	return function(callback) {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(error) {
					return {
						title: 'Stylus',
						message: error.message
					};
				})
			}))
			.pipe($.if(config.isDevelopment, $.sourcemaps.init()))
			.pipe($.stylus(stylusOptions))
			.pipe($.if(config.isDevelopment, $.sourcemaps.write()))
			.pipe(gulp.dest(options.dest));
	};
};
