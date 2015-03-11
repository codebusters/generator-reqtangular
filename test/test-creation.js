/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('reqtangular generator (main generator)', function () {

  var appName = 'unitTestApp';
  var deps = ['../../app', '../../theme'];

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('reqtangular:app', deps, [appName], {
        'appPath': '../../app',
        'skip-welcome-message': true, 
        'skip-install': true
      });

      helpers.mockPrompt(this.app, {
        'appName': appName,
        'less' : true,
        'seo' : true
      });

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'app',
      'app/config',
      'app/styles',
      'app/images',
      'app/scripts',
      'app/scripts/modules',
      'app/404.html',
      'app/favicon.ico',
      'app/.htaccess',
      'app/robots.txt',
      'app/index.template.html',
      'package.json',
      'bower.json',
      'bowerrc',
      '.editorconfig',
      '.jshintrc',
      'Gruntfile.js',
      'karma.conf.js',
      'karma-e2e.conf.js',
      'test'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });

  });
/*
  it('requests appName', function (done) {

    // TODO

  });
*/
  it('applies appName to files', function (done) {

    this.app.run({}, function () {

      helpers.assertFileContent('bower.json',
        new RegExp('"name": "' + appName + '"')
      );
      helpers.assertFileContent('package.json',
        new RegExp('"name": "' + appName + '"')
      );
      helpers.assertFileContent('app/scripts/configuration.js',
        new RegExp('"name": "' + appName + '"')
      );
      helpers.assertFileContent('app/scripts/modules/main/templates/main.html',
        new RegExp('<!-- navAnchor \\(do not delete!\\)-->')
      );
      done();
    });

  });


});
