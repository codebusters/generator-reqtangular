'use strict';
var yeoman = require('yeoman-generator'),
        yosay = require('yosay'),
        path = require('path'),
        fs = require('fs'),
        chalk = require('chalk'),
        sync = require('synchronize');
var NgRequireModuleGenerator = yeoman.generators.Base.extend({
  askModuleName: function() {
    var done = this.async();
    this.theme = 'codebusters';

    if (this.arguments[0]) {
      this.themePath = path.join('/templates/_themes/', this.arguments[0]);
      done();

    } else {

      if (!this.options['skip-welcome-message']) {
        this.log(yosay('Welcome to the marvelous Reqtangular Theme Injector!'));
      }

      if (this.options['theme']) {
        this.themePath = path.join('/templates/_themes/', this.options['theme'].toLowerCase());
        done();
      } 
      else {

        var prompts = [
          {
            type: "list",
            name: "theme",
            message: "Choose theme",
            choices: ["codeBusters", "Business","Darkness"],
            filter: function(val) {
              return val.toLowerCase();
            },
            default: 0
          }
        ];

        this.prompt(prompts, function(props) {
          this.themePath = path.join('/templates/_themes/', props.theme.toLowerCase());
//      var themeConfig = require('.' + this.themePath + '/config.json');
          done();
        }.bind(this));
      }
    }
  },
  copyFiles: function() {
    this.directory(__dirname + this.themePath + '/images', 'app/images');
    this.directory(__dirname + this.themePath + '/fonts', 'app/fonts');
    this.copy(__dirname + this.themePath + '/styles/css/main.css', 'app/styles/main.css');
    this.copy(__dirname + this.themePath + '/js/_vendor.js', 'app/vendor.js');
  }
});

module.exports = NgRequireModuleGenerator;
