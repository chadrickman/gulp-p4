'use strict';

var p4 = require('node-perforce');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-p4';

module.exports = function (p4cmd, options) {
  if (!p4cmd) throw new PluginError(PLUGIN_NAME, 'Missing p4 command');
  if (!p4[p4cmd]) throw new PluginError(PLUGIN_NAME, 'Invalid command');

  return through.obj(function (file, enc, callback) {
    options = options || {};
    options.files = [file.history];
    p4[p4cmd](options, function(err) {
      if (err) throw new PluginError(PLUGIN_NAME, err);
      callback();
    });
  });
};