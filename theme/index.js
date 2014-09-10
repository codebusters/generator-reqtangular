'use strict';
var yeoman = require('yeoman-generator'),
        yosay = require('yosay'),
        path = require('path'),
        fs = require('fs'),
        chalk = require('chalk'),
        sync = require('synchronize');
var that;
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
        this.themePath = path.join('/templates/_themes/', this.options['theme']);
      } else {
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
          this.themePath = path.join('/templates/_themes/', props.theme);
//      var themeConfig = require('.' + this.themePath + '/config.json');
          done();
        }.bind(this));
      }
    }
  },
  generateCssFIle: function() {
    console.log(chalk.bold.green('Processing theme styles files:'));
    generateFile(this.themePath, '/styles/css/', '_main.css', function(result) {
//      that.copy(__dirname + themePath + '/_main.css', 'app/styles/main.css');
    });
  },
  generateJsFIle: function() {
    console.log(chalk.bold.green('Processing theme js files:'));
    generateFile(this.themePath, '/js/', '_vendor.js', function(result) {
//      that.copy(__dirname + themePath + '/_vendor.js', 'app/vendor.js');
    });
  },
  copyFiles: function() {
    this.directory(__dirname + this.themePath + '/images', 'app/images');
    this.directory(__dirname + this.themePath + '/fonts', 'app/fonts');
    this.copy(__dirname + this.themePath + '/_main.css', 'app/styles/main.css');
    this.copy(__dirname + this.themePath + '/_vendor.js', 'app/vendor.js');
  }
});

function generateFile(themePath, originPath, destinationFile, cb) {
  var stylesPath = path.join(__dirname, themePath, originPath);
  sync(fs, 'readdir', 'stat', 'readFile', 'writeFile');
  sync.fiber(function() {
    var i, paths, path, stat, data = '';
    paths = fs.readdir(stylesPath);
    //Read css files
    for (i = 0; i < paths.length; i++) {
      path = paths[i];
      console.log(chalk.green('\tConcatenating ' + path));
      stat = fs.stat(stylesPath + path);
      if (!stat.isFile())
        continue
      data += fs.readFile(stylesPath + path, 'utf8') + '\n';
    }
    //Write css file
    fs.writeFile(__dirname + themePath + '/' + destinationFile, data, function(err) {
      if (err) {
        console.log(err);
      } else {
        cb(true);
      }
    });
  });
}

module.exports = NgRequireModuleGenerator;
