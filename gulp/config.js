'use strict';

var path = require('path');

var config = {
	isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
	isGenerateRev: true,
	isNeedApplyReplaceRev: true,
	manifestDir: 'manifest',
	extraPackages: {
		'lodashGet': 'lodash/get',
		'streamCombiner2': 'stream-combiner2'
	}
};

module.exports = config;