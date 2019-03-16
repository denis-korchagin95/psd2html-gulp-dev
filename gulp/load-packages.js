'use strict';

var plugins = require('gulp-load-plugins')();
var gulpConfig = require('./config');
var lodashGet = require('lodash/get');

var extraPackages = lodashGet(gulpConfig, 'extraPackages', {});

var cache = {};

function loadPackage(name) {
	var ref;
	if( (ref = cache[name]) != null )
		return ref;
	return cache[name] = require(name);
}


Object.keys(gulpConfig.extraPackages).forEach(function(element) {
	if( plugins[element] == null )
		plugins[element] = function() {
			return loadPackage(extraPackages[element]).call(this, arguments);
		};
});

module.exports = plugins;