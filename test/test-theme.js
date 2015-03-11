/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var generators = require('yeoman-generator').generators;

describe('reqtangular:module generator', function () {

  var appName = 'themeUnitTestApp';

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      var deps = ['../../app', '../../theme'];

      this.app = helpers.createGenerator('reqtangular:app', deps , [appName], {
        'appPath': '../../app',
        'skip-welcome-message': true,
        'skip-install': true
      });

      helpers.mockPrompt(this.app, {
        'appName': appName
      });

      this.module = helpers.createGenerator('reqtangular:blankModule', ['../../blankModule'], [], {
        'appPath': '../../module',
        'skip-welcome-message': true,
        'avoid-info': true
      });
      this.directives = true;
      // need app previously ran
      this.app.run({}, function () {
        done();
      });

    }.bind(this));
  });

  it('calls reqtangular:theme', function (done) {

    var deps = [
      '../../theme'
    ];

    var module = helpers.createGenerator('reqtangular:theme', deps, [], { force:true });

    helpers.mockPrompt(module, {
      'theme': 'codeBusters'
    });

    module.run({}, function () {
//      helpers.assertFile(expected);
      done();
    });


    // TODO: actually test stuff
  });
  
});


