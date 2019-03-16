'use strict';

var config = {
	isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
	extraPackages: {
		'lodashGet': 'lodash/get'
	}
};

module.exports = config;