'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var context = {};

var config = {
  askForSEO : false
};

var NgRequireGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');
    this.less = false;
    this.on('end', function() {

      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: this.options['skip-install'],
        skipMessage: this.options['skip-install'],
        callback: function() {
          console.log(chalk.yellow('┌────────────────────────────────────────────────────────────────┐'));
          console.log(chalk.yellow('│ ' + chalk.white('Everything is ready!, just run: ') + chalk.blue(' grunt serve')) + chalk.yellow('                   │'));
          console.log(chalk.yellow('│ ' + chalk.white('or build distribution version with: ') + chalk.blue(' grunt dist')) + chalk.yellow('                │'));
          console.log(chalk.yellow('│ ' + chalk.white('wiki') + chalk.blue(' https://github.com/codebusters/generator-reqtangular/wiki')) + chalk.yellow(' │'));
          console.log(chalk.yellow('└────────────────────────────────────────────────────────────────┘'));
        }
      });

    });
  },
  askFor: function() {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular generator!'));
      //codeBusters brand.
      console.log(' ' + chalk.bold.yellow('reqtangular') + ' v' + this.pkg.version + '\t\t' + chalk.bold.white('code') + chalk.bold.red('Busters')
              + chalk.bold.white(' S.L.') + '\n\n');
    }

    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'How would you like to name your application?',
        default: 'reqtangular'
      }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;
      //Remove all special chars
      this.appNamePackage = this.appName.replace(/[^\w\s]/gi, '');
      //Remove white spaces
      this.appNamePackage = this.appNamePackage.replace(/\s+/g, '');
      this.reqtangularName = this.pkg.name;
      this.reqtangularVersion = this.pkg.version;
      done();
    }.bind(this));
  },

  askForSEO: function() {

    context.indexTitle = '';
    context.indexDescription = '';

    if (config.askForSEO) {

      var done = this.async();
      this.prompt([{
          type: 'confirm',
          name: 'seo',
          message: 'Would you like to configure basic SEO data?',
          default: true
        }], function(props) {
        if (props.seo) {
          var questions = [
            {
              type: "input",
              name: "indexTitle",
              message: "Enter index title"
            },
            {
              type: "input",
              name: "indexDescription",
              message: "Enter index description"
            }
          ];
          this.prompt(questions, function(answers) {
            context.indexTitle = answers.indexTitle;
            context.indexDescription = answers.indexDescription;
            done();
          });
        } else {
          done();
        }
      }.bind(this));

    }

  },
  app: function() {
    context.appConfig = {
      app: 'app',
      dist: 'dist'
    };
    context.connect = {
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    };
    context.less = this.less || false;
    context.appName = this.appName;

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', 'bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('_gruntfile.js', 'Gruntfile.js', context);
    this.copy('_karma.conf.js', 'karma.conf.js');
    this.copy('_karma-e2e.conf.js', 'karma-e2e.conf.js');
  },
  scaffoldFolders: function() {
    this.mkdir('app');
    // TODO add assert for inner files in test
    this.directory('_app/_config', 'app/config');
    // TODO add assert for inner files in test
    this.mkdir('app/styles');
    // TODO add assert for inner files in test
    this.directory('_app/_images', 'app/images');
    // TODO add assert for inner files in test
    this.directory('_app/_scripts', 'app/scripts');
    this.mkdir('test');
  },
  appFiles: function() {
    // TODO for now only copying
    this.copy('_app/_404.html', 'app/404.html');
    this.copy('_app/_favicon.ico', 'app/favicon.ico');
    this.copy('_app/htaccess', 'app/.htaccess');
    this.copy('_app/_robots.txt', 'app/robots.txt');

    this.template('_app/_index.template.html', 'app/index.template.html', context);
  }
  ,
  applyDefaultTheme: function() {
    // TODO add tests
    this.invoke('reqtangular:theme', {
      options: {
        theme: 'codeBusters', 
        'skip-welcome-message' : true
      }
    });

  }

});

module.exports = NgRequireGenerator;
