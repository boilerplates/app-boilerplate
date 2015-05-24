/**
 * assemble <https://github.com/assemble/assemble>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert, Brian Woodward.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var should = require('should');
var assemble = require('..');
var app;

describe('front matter', function () {
  beforeEach(function () {
    app = assemble.init();
  });

  describe('options', function () {
    it('should pass options to gray-matter', function () {
      app.option({matter: {delims: '~~~'}});
      app.partial({
        path: 'aaa',
        content: '~~~\ntitle: AAA\n~~~\nThis is content'
      });
      app.views.partials.should.have.property('aaa');
      app.views.partials.aaa.should.have.property('data');
      app.views.partials.aaa.data.should.have.property('title', 'AAA');
    });
  });

  describe('`data.page` property', function () {
    it('should clone front matter data onto the `page` object', function () {
      app.page({path: 'bbb', content: '---\ntitle: BBB\n---\nThis is content'});
      app.views.pages.should.have.property('bbb');
      app.views.pages.bbb.should.have.property('data');
      app.views.pages.bbb.data.should.have.property('title', 'BBB');
      app.views.pages.bbb.data.page.should.have.property('title', 'BBB');
    });
  });
});
