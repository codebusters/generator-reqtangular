/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');

describe('reqtangular generator', function () {
  it('app can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  it('module can be imported without blowing up', function () {
    var module = require('../module');
    assert(module !== undefined);
  });
});
