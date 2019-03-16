'use strict';

var $ = require('../load-packages');

module.exports = function(gulp, config, options) {
	var pugOptions = $.lodashGet(options, 'pugOptions', {});

	if(config.isDevelopment)
		pugOptions.pretty = true;

	var revReplaceQueue = $.lodashGet(options, 'revReplaceQueue', []).map(function(manifestPath) {
		return $.revReplace({
			manifest: gulp.src(manifestPath, {allowEmpty: true})
		});
	});

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
			.pipe($.if(!config.isDevelopment && config.isNeedApplyReplaceRev, $.streamCombiner2.obj.apply($.streamCombiner2.obj, revReplaceQueue)))
			.pipe(gulp.dest(options.dest));
	};
};