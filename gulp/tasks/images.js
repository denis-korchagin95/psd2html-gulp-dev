'use strict';

var $ = require('../load-packages');
var gulp = require('gulp');


module.exports = function(options) {
	return function(callback) {
		return gulp.src(options.src)
			.pipe(gulp.dest(options.dest));
	};
};