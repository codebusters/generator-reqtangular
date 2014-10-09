'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../common/util.js');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

var AboutUsModuleGenerator = yeoman.generators.Base.extend({
  askForData: function() {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular authoring module generator!'));
    }
    var questions = [
      {
        type: 'input',
        name: 'rest',
        message: 'Enter REST service address',
        default: 'http://127.0.0.1:8080'
      }
    ];
    this.prompt(questions, function(answers) {
      this.restService = answers.rest;
      done();
    }.bind(this));
  },
  moduleConfig: function() {
    var moduleName = this.options['moduleName'] || 'auth';
    this.addToNav = true;
    this.moduleName = this._.underscored(moduleName);
    this.moduleNameTitle = this._.classify(moduleName);

    this.angularModuleName = this.moduleNameTitle + 'Module';
    this.moduleControllerClass = this.moduleNameTitle + 'Controller';

    this.appPath = 'app';
    this.moduleRelativePath = path.join('modules', moduleName);
    this.modulePath = path.join(this.appPath, 'scripts', this.moduleRelativePath);

    this.controllerFile = moduleName + '_ctrl';
    this.routeFile = moduleName + '_route';
    this.serviceFile = moduleName + '_service';
    this.directiveFile = moduleName + '_directive';
  },
  module: function() {
    this.mkdir(this.modulePath);
    this.mkdir(path.join(this.modulePath, 'templates'));

    this.copy('_module/_templates/_template.html',
            path.join(this.modulePath, 'templates', this.moduleName + '.tpl.html'));

    this.copy('_module/_controller.js', path.join(this.modulePath, this.controllerFile + '.js'));

    this.copy('_module/_route.js', path.join(this.modulePath, this.routeFile + '.js'));

    this.copy('_module/_service.js', path.join(this.modulePath, this.serviceFile + '.js'));

    this.copy('_module/_directive.js', path.join(this.modulePath, this.directiveFile + '.js'));
  },
  injectDependenciesToApp: function() {
    angularUtils.injectIntoFile(
            this.appPath,
            path.join(this.moduleRelativePath, this.controllerFile),
            this.angularModuleName
            );
  },
  addTranslations: function() {
    var appTranslationsPath = 'app/scripts/modules/lang/translations';
    var moduleTranslationsPath = path.join(path.dirname(this._sourceRoot), 'translations');
    var moduleTranslationsFiles = fs.readdirSync(moduleTranslationsPath);
    for (var i in moduleTranslationsFiles) {
      var appFilePath = path.join(appTranslationsPath, moduleTranslationsFiles[i]);
      if (fs.existsSync(appFilePath)) {
        var moduleTranslationsContentFile = fs.readFileSync(path.join(moduleTranslationsPath, moduleTranslationsFiles[i]), 'utf8');
        console.log(chalk.green("Injecting translation file:") + moduleTranslationsFiles[i]);
        var placeholderTranslation = this.engine("\"module.<%= moduleName %>\":" + moduleTranslationsContentFile + ",", this);
        angularUtils.injectIntoJSON(
                appFilePath,
                "\"IMPORTANT_NEEDLE_DATA\": \"do not remove\"",
                placeholderTranslation
                );
      } else {
        console.log(chalk.yellow("Skipped file:") + moduleTranslationsFiles[i] + chalk.yellow(" because is not configured in main app."));
      }
    } //end for
  },
  addToNavigation: function() {
    if (this.addToNav) {
      var mainHtmlFilePath = path.join(this.appPath, 'scripts/modules/main/templates/main.html');
      angularUtils.injectIntoNav(
              mainHtmlFilePath,
              "<!-- navAnchor (do not delete!)-->",
              this.engine("<li ng-class=\"{ active: menuCtrl.isSelected('<%= moduleName %>') }\"><a ng-click=\"menuCtrl.selectMenu('<%= moduleName %>')\" ng-href=\"#/<%= moduleName %>\" translate=\"module.<%= moduleName %>.moduleName\"></a></li>\n", this)
              );
      if (!this.options['avoid-info']) {
        this.log('All done, a link has been added to navigation bar, please add corresponding translations to files in app/scripts/modules/lang/translations/');
      }
    }
  },
  registerModule: function() {
    var module = {
      'name': this.moduleName,
      'navBar': this.addToNav,
      'rest': this.restService
    };
    angularUtils.registerModule(this.appPath, module);
  }
});

module.exports = AboutUsModuleGenerator;