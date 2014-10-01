'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../common/util.js');
var path = require('path');
//var queue = require('grouped-queue');

var PreBuiltModuleGenerator = yeoman.generators.Base.extend({
  askModules: function() {
    this.appPath = 'app';
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular prebuilt modules generator!'));
    }
    console.log(angularUtils.getModule(this.appPath, 'blog'))
    this.prompt([
      {
        type: 'checkbox',
        message: 'Select modules to add',
        name: 'modules',
        choices: [
          {
            name: 'About Us',
            value: 'aboutUsModule',
            checked: angularUtils.getModule(this.appPath, 'about') ? true :false
          },
          {
            name: 'Contact',
            value: 'contactModule',
            checked: angularUtils.getModule(this.appPath, 'contact') ? true :false
          },
          {
            name: 'Portfolio',
            value: 'portfolioModule',
            checked: angularUtils.getModule(this.appPath, 'portfolio') ? true :false
          },
          {
            name: 'Blog',
            value: 'blogModule',
            checked: angularUtils.getModule(this.appPath, 'blog') ? true :false
          },
          {
            name: 'Auth',
            value: 'authModule',
            checked: angularUtils.getModule(this.appPath, 'auth') ? true :false
          }
        ], validate: function(answer) {
          if (answer.length < 1) {
            return "You must choose at least one module.";
          }
          return true;
        }
      }], function(answer) {
      var that = this;

      var getNextModule = function() {
        return answer.modules.shift();
      };

      var invokeRemainingModules = function() {
        var nextModule = getNextModule();
        if (nextModule) {
          invokeModule(nextModule);
        }
      };

      var invokeModule = function(module) {

        var moduleInvocation = that.invoke('reqtangular:' + module, {
          options: {
            'skip-welcome-message': true,
            'avoid-info': true
          }
        });

        moduleInvocation.on('end', function() {
          invokeRemainingModules();
        });

      };

      invokeRemainingModules();

      done();
    }.bind(this));
  }
});
module.exports = PreBuiltModuleGenerator;

