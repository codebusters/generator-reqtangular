'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../common/util.js');
var path = require('path');
var chalk = require('chalk');

var LangModuleGenerator = yeoman.generators.Base.extend({
  askForData: function() {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular languages generator!'));
    }
    this.prompt([
      {
        type: 'checkbox',
        message: 'Select languages to add',
        name: 'langs',
        choices: [
          {
            name: chalk.red('|') + chalk.yellow('|') + chalk.red('|') + ' Spanish',
            value: 'es',
            checked: false
          },
          {
            name: chalk.black('|') + chalk.red('|') + chalk.yellow('|') + ' German',
            value: 'de',
            checked: false
          }
        ], validate: function(answer) {
          if (answer.length < 1) {
            return "You must choose at least one language.";
          }
          return true;
        }
      }], function(answer) {
      this.answer = answer;
      done();
    }.bind(this));
  },
  registerLangs: function() {
    angularUtils.registerLangs('app', this.answer.langs);
  },
  addLangFile: function() {
    var translationsPath = 'app/scripts/modules/lang/translations';
    var that = this;
    this.answer.langs.forEach(function(lang) {
      that.copy('_langs/_' + lang + '.json', path.join(translationsPath, lang + '.json'));
    });
  }
});
module.exports = LangModuleGenerator;

