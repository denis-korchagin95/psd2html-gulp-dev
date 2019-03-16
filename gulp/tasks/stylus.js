'use strict';

var $ = require('../load-packages');

module.exports = function(gulp, config, options) {
	var stylusOptions = $.lodashGet(options, 'stylusOptions', {});
	var autoprefixerOptions = $.lodashGet(options, 'autoprefixerOptions', {});

	if( stylusOptions.define == null )
		stylusOptions.define = {};
	if( stylusOptions.define.url == null )
		stylusOptions.define.url = $.stylus.stylus.resolver();

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
						title: 'Stylus',
						message: error.message
					};
				})
			}))
			.pipe($.if(config.isDevelopment, $.sourcemaps.init()))
			.pipe($.stylus(stylusOptions))
			.pipe($.autoprefixer(autoprefixerOptions))
			.pipe($.if(!config.isDevelopment, $.cssnano()))
			.pipe($.if(!config.isDevelopment && config.isGenerateRev, $.rev()))
			.pipe($.if(config.isDevelopment, $.sourcemaps.write()))
			.pipe($.if(!config.isDevelopment && config.isNeedApplyReplaceRev, $.streamCombiner2.obj.apply($.streamCombiner2.obj, revReplaceQueue)))
			.pipe(gulp.dest(options.dest))
			.pipe($.if(!config.isDevelopment && config.isGenerateRev, $.streamCombiner2.obj(
				$.rev.manifest(options.manifestName),
				gulp.dest(config.manifestDir)
			)))
	};
};
