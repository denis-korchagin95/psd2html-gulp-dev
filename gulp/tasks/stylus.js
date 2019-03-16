'use strict';

var $ = require('../load-packages');
var gulp = require('gulp');

module.exports = function(options) {
	var stylusOptions = $.lodashGet(options, 'stylusOptions', {});
	return function(callback) {
		return gulp.src(options.src)
			.pipe($.stylus(stylusOptions))
			.pipe(gulp.dest(options.dest));
	};
};
