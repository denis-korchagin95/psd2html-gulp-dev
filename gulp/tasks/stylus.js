'use strict';

var $ = require('../load-packages');
var gulp = require('gulp');

module.exports = function(options) {
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
			.pipe($.if($._config.isDevelopment, $.sourcemaps.init()))
			.pipe($.stylus(stylusOptions))
			.pipe($.if($._config.isDevelopment, $.sourcemaps.write()))
			.pipe(gulp.dest(options.dest));
	};
};
