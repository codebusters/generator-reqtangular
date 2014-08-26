/*global describe, beforeEach, it */
'use strict';
var path = require('path');
//var testUtil = require('../common/testUtil');
var helpers = require('yeoman-generator').test;

describe('reqtangular:module generator', function () {

  var moduleName = 'test';
  var appName = 'unitTestApp';

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('reqtangular:app',  ['../../app'], [appName], {
        'appPath': '../../app',
        'skip-welcome-message': true,
        'skip-install': true
      });

      helpers.mockPrompt(this.app, {
        'appName': appName,
        'theme': "snow"
      });

      this.module = helpers.createGenerator('reqtangular:module', ['../../module'], [], {
        'appPath': '../../module',
        'skip-welcome-message': true,
        'avoid-info': true
      });

      // need app previously ran
      this.app.run({}, function () {
        done();
      });

    }.bind(this));
  });

  it('creates expected files for reqtangular:module', function (done) {

    helpers.mockPrompt(this.module, {
      'moduleName': moduleName
    });

    var expected = [
      // add files you expect to exist here.
      'app/scripts/modules/test',
      'app/scripts/modules/test/test_ctrl.js',
      'app/scripts/modules/test/test_route.js',
      'app/scripts/modules/test/templates',
      'app/scripts/modules/test/templates/test.tpl.html'
    ];

    this.module.run({}, function () {
      helpers.assertFile(expected);
      done();
    });

  });

  it('module applies moduleName to files', function (done) {

    helpers.mockPrompt(this.module, {
      'moduleName': moduleName
    });

    this.module.run({}, function () {

      // test_ctrl.js
      helpers.assertFileContent('app/scripts/modules/test/test_ctrl.js',
        new RegExp('\'\\./test_route\'')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_ctrl.js',
        new RegExp('angular\\.module\\(\'TestModule\', \\[\'TestModule\\.routing\'\\]\\)')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_ctrl.js',
        new RegExp('\\.controller\\(\'TestController\', \\[\'\\$scope\', \'\\$log\'')
      );

      // test_route.js
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('\'text!\./templates/test\\.tpl\\.html\'')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('\\], function\\(angular, template\\) {')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('angular\.module\\(\'TestModule\.routing\', \\[\'ngRoute\'\\]\\)\\.config\\(function\\(\\$routeProvider\\) {')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('\\$routeProvider\\.when\\(\'/test\', {')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('template: template,')
      );
      helpers.assertFileContent('app/scripts/modules/test/test_route.js',
        new RegExp('controller: \'TestController\'')
      );

      // template
      helpers.assertFileContent('app/scripts/modules/test/templates/test.tpl.html',
        new RegExp('<p>Hello! This is the view for your new Test module.</p>')
      );

      // app
      helpers.assertFileContent('app/scripts/app.js',
        new RegExp('\'modules/test/test_ctrl\'')
      );
      helpers.assertFileContent('app/scripts/app.js',
        new RegExp('\'TestModule\'')
      );

      done();
    });

  });

  var addedToNavRegex = '<li ng-class="{ active: menuCtrl\\.isSelected\\(\'test\'\\) }">\\s*<a ng-click="menuCtrl\\.selectMenu\\(\'test\'\\)" ng-href="#/test" translate="test"></a></li>\\s*<!-- navAnchor \\(do not delete!\\)-->';

  it('adds link to nav', function (done) {

    helpers.mockPrompt(this.module, {
      'moduleName': moduleName,
      'addToNav': true
    });

    this.module.run({}, function () {

      helpers.assertFileContent('app/scripts/modules/main/templates/main.html',
        new RegExp(addedToNavRegex)
      );

      done();
    });

  });

  it('does not add link to nav', function (done) {

    helpers.mockPrompt(this.module, {
      'moduleName': moduleName,
      'addToNav': false
    });

    this.module.run({}, function () {

      helpers.assertNoFileContent('app/scripts/modules/main/templates/main.html',
        new RegExp(addedToNavRegex)
      );

      done();
    });

  });



});
