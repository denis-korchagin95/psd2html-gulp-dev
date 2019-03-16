'use strict';

var AssetsWebpackPlugin = require('assets-webpack-plugin');
var fancyLog = require('fancy-log');
var notifier = require('node-notifier');
var path = require('path');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');


module.exports = function(gulp, config, options) {
	var scriptPath = path.resolve(__dirname, '../../src/js');

	return function(callback) {

		var webpackOptions = {
			mode: config.isDevelopment ? 'development' : 'production',
			watch: config.isDevelopment,
			devtool: config.isDevelopment ? 'cheap-module-inline-source-map' : false,
			entry: {
				home: scriptPath + '/home.js'
			},
			optimization: {},
			output: {
				path: path.resolve(__dirname, '../../dist/js'),
				publicPath: '/js/',
				filename: config.isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
			},
			plugins: [
				new webpack.NoEmitOnErrorsPlugin()
			]
		};

		if( !config.isDevelopment )
			webpackOptions.optimization.minimizer = [
				new UglifyJsWebpackPlugin({
					uglifyOptions: {
						// don't show unreachable variables etc
						warnings: false
					}
				})
			];
			webpackOptions.plugins.push(
				new AssetsWebpackPlugin({
					filename: options.manifestName,
					path: path.resolve(__dirname, '../..', config.manifestDir),
					processOutput: function(assets) {
						for(var key in assets) {
							assets[key + '.js'] = assets[key].js.slice(webpackOptions.output.publicPath.length);
							delete assets[key];
						}
						return JSON.stringify(assets);
					}
				})
			)


		webpack(webpackOptions, function(err, stats) {
			if(!err) { // no hard error
				// try to get a soft error from stats
				err = stats.toJson().errors[0]
			}

			if(err) {
				notifier.notify({
					title: 'Webpack',
					message: err
				});

				fancyLog.error(err);
			}
			else {
				fancyLog(stats.toString({
					colors: true
				}))
			}

 			// task never errs in watch mode, it waits and recompiles
 			if(!webpackOptions.watch && err) {
 				callback(err);
 			}
 			else {
				callback();
 			}
		});

	};
};