/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var yoGen = require('yeoman-generator');
var helpers = yoGen.test;
var generators = yoGen.generators;
/*
// integration! disable for now
describe('reqtangular:prebuiltModule generator', function () {

  var testDirectory = path.join(__dirname, 'temp');

  beforeEach(function (done) {
    helpers.testDirectory(testDirectory, function (err) {
      if (err) {
        return done(err);
      }

      this.module = helpers.createGenerator('reqtangular:prebuiltModule', ['../../prebuiltModule'], [], {
        'skip-welcome-message': true
      });

      done();

    }.bind(this));
  });

  it('prebuiltModule test integration)', function (done) {
    var contactModule = require('../contactModule/index');
    var aboutUsModule = require('../aboutUsModule/index');

    var deps = [
      '../../prebuiltModule',
      [contactModule, 'reqtangular:contactModule'],
      [aboutUsModule, 'reqtangular:aboutUsModule']
    ];

    var module = helpers.createGenerator('reqtangular:prebuiltModule', deps, [], {
      'skip-welcome-message': true
    });

    helpers.mockPrompt(module, {
      'modules': ['contactModule', 'aboutUsModule']
    });

    module.run({}, function () {
      done();
    });

  });
});
*/