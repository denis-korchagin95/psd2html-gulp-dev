'use strict';

var del = require('del');

module.exports = function(options) {
	return function(callback) {
		var promises = options.folders.map(function(item) { return del(item); });
		return Promise.all(promises);
	};
};