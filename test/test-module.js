/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var generators = require('yeoman-generator').generators;

describe('reqtangular:module generator', function () {

  var moduleName = 'test';
//  var appName = 'unitTestApp';

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      done();

    }.bind(this));
  });

  it('calls reqtangular:blankModule', function (done) {

    var blankModule = function () {
      return generators.Base.extend({
        test: function () {
          this.shouldRun = true;
        },
        assertMethodCall: function () {
          done();
        }
      });
    }();

    var deps = [
      '../../module',
      [blankModule, 'reqtangular:blankModule']
    ];

    var module = helpers.createGenerator('reqtangular:module', deps, [], {});

    helpers.mockPrompt(module, {
      'moduleName': moduleName,
      'moduleOption': 'blank'
    });

    module.run({}, function () {});

  });
  
  it('calls reqtangular:prebuiltModule', function (done) {

    var blankModule = function () {
      return generators.Base.extend({
        test: function () {
          this.shouldRun = true;
        },
        assertMethodCall: function () {
          done();
        }
      });
    }();

    var deps = [
      '../../module',
      [blankModule, 'reqtangular:prebuiltModule']
    ];

    var module = helpers.createGenerator('reqtangular:module', deps, [], {});

    helpers.mockPrompt(module, {
      'moduleName': moduleName,
      'moduleOption': 'pre-built'
    });

    module.run({}, function () {});

  });

});


