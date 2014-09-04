'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../common/util.js');
var path = require('path');

var PreBuiltModuleGenerator = yeoman.generators.Base.extend({
  askModules: function() {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular prebuilt modules generator!'));
    }
    this.prompt([
      {
        type: 'checkbox',
        message: 'Select modules to add',
        name: 'modules',
        choices: [
          {
            name: 'Contact',
            value: 'contactModule',
            checked: false
          },
          {
            name: 'About Us',
            value: 'aboutUsModule',
            checked: false
          }
        ], validate: function(answer) {
          if (answer.length < 1) {
            return "You must choose at least one module.";
          }
          return true;
        }
      }], function(answer) {
      var that = this;
      answer.modules.forEach(function(module) {
        that.invoke('reqtangular:' + module, {
          options: {
            'skip-welcome-message': true
          }
        });
      });
      done();
    }.bind(this));
  }
});
module.exports = PreBuiltModuleGenerator;

