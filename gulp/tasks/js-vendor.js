'use strict';

var $ = require('../load-packages');

module.exports = function(gulp, config, options) {
	return function(callback) {
		return gulp.src(options.src, { since: gulp.lastRun(options._taskName) })
			.pipe($.newer(options.dest))
			.pipe($.if(!config.isDevelopment && config.isGenerateRev, $.rev()))
			.pipe(gulp.dest(options.dest))
			.pipe($.if(!config.isDevelopment && config.isGenerateRev, $.streamCombiner2.obj(
				$.rev.manifest(options.manifestName),
				gulp.dest(config.manifestDir)
			)))
	};
};