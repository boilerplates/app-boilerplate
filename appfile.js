'use strict';

var through = require('through2');
var app = require('./');

app.option({delims: ['{{', '}}']});
app.layouts('test/fixtures/layouts/*.md');
app.data({name: 'Jon', blah: 'abc'});

app.task('default', function () {
  app.src('test/fixtures/foo.md')
    .pipe(app.dest('test/actual'))
});

app.task('rename', function () {
  app.src('test/**/*.*')
    .pipe(through.obj(function(file, enc, cb) {
      this.push(file);
      return cb();
    }))
    .pipe(app.dest('test'))
});
