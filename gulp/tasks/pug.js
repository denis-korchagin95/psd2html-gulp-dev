'use strict';

var $ = require('../load-packages');
var gulp = require('gulp');


module.exports = function(options) {
	var pugOptions = $.lodashGet(options, 'pugOptions', {});
	return function(callback) {
		return gulp.src(options.src)
			.pipe($.pug(pugOptions))
			.pipe(gulp.dest(options.dest));
	};
};