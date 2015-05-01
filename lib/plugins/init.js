'use strict';

var PluginError = require('plugin-error');
var through = require('through2');

module.exports = plugin('app', 'init');

function plugin(appname, name) {
  var pluginname = appname + '-' + name + ':';

  return function initPlugin() {
    var app = this;
    var id = this.getTask();

    // create a template type for vinyl files and assign a loader
    if (!app.hasOwnProperty(id)) {
      app.create(id, ['task']);
    }

    var stream = through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      // Convert vinyl file to app template and add to collection
      app[id](file);
      cb();
    }, function (cb) {
      app.pushToStream(id, this);
      cb();
    });

    app.session.bindEmitter(stream);
    return stream;
  };
}
