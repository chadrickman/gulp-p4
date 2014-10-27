'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;

var PLUGIN_NAME = 'gulp-p4';

function optionMapper(options) {
  if (!options) return '';
  var optionMaps = {
    changelist: {cmd: '-c', args: true},
    filetype: {cmd: '-t', args: true},
    force: {cmd: '-f', args: false},
    description: {cmd: '-i', args: true}
  };
  return Object.keys(options).map(function (option) {
    var map = optionMaps[option];
    if (!map || !options[option]) return;
    return map.cmd + (map.args ? ' ' + options[option] : '');
  }).join(' ');
}

function execP4(p4cmd, options, files, callback) {
  if (arguments.length === 3 && typeof files === 'function' && Array.isArray(options)) {
    callback = files;
    files = options;
    options = undefined;
  }
  var cmd = [];
  cmd.push('p4');
  cmd.push(p4cmd);
  cmd.push(optionMapper(options));
  cmd.push(files);
  console.log(cmd.join(' '));
  exec(cmd.join(' '), callback);
}

module.exports = function (p4cmd, options) {
  if (!p4cmd) {
    throw new PluginError(PLUGIN_NAME, 'Missing p4 command');
  }
  var stream = through.obj(function (file, enc, cb) {
    execP4(p4cmd, options, file.history, function (err, stdout, stderr) {
      if (err) {
        throw new PluginError(PLUGIN_NAME, err);
      }
      cb();
    });
  });
  return stream;
};