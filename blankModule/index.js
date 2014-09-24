'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../common/util.js');
var path = require('path');
var fs = require('fs');

var BlankModuleGenerator = yeoman.generators.Base.extend({
  askModuleName: function() {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous Reqtangular blank module generator!'));
    }

    var prompts = [{
        type: 'input',
        name: 'moduleName',
        message: 'How would you like to name your module?',
        default: 'module_name'
      }];

    this.prompt(prompts, function(props) {

      this.moduleName = this._.underscored(props.moduleName);
      this.moduleNameTitle = this._.classify(props.moduleName);

      this.angularModuleName = this.moduleNameTitle + 'Module';
      this.moduleControllerClass = this.moduleNameTitle + 'Controller';

      this.appPath = 'app';
      this.moduleRelativePath = path.join('modules', this.moduleName);
      this.modulePath = path.join(this.appPath, 'scripts', this.moduleRelativePath);

      this.controllerFile = this.moduleName + '_ctrl';
      this.routeFile = this.moduleName + '_route';

      done();
    }.bind(this));
  },
  askForExtendedFunctionality: function() {
    var done = this.async();
    this.prompt([
      {
        type: 'checkbox',
        message: 'Select extended functionality to add',
        name: 'moduleFunctions',
        choices: [
          {
            name: 'Directives',
            value: 'directives',
            checked: false
          },
          {
            name: 'Services',
            value: 'services',
            checked: false
          }
        ]
      }
    ], function(answers) {
      this.directives = answers.moduleFunctions.indexOf('directives') !== -1 ? true : false;
      this.services = answers.moduleFunctions.indexOf('services') !== -1 ? true : false;
      done();
    }.bind(this));
  },
  askForNavLink: function() {
    var done = this.async();
    this.prompt([{
        type: 'confirm',
        name: 'addToNav',
        message: 'Would you like a link to your new module on the nav bar?',
        default: true
      }], function(props) {
      this.addToNav = props.addToNav;

      done();
    }.bind(this));
  },
  module: function() {
    this.mkdir(this.modulePath);
    this.mkdir(path.join(this.modulePath, 'templates'));

    this.copy('_module/_templates/_template.html',
            path.join(this.modulePath, 'templates', this.moduleName + '.tpl.html'));

    this.copy('_module/_route.js', path.join(this.modulePath, this.routeFile + '.js'));

    //Extended module functionalities.
    if (this.directives) {
      this.directiveFile = this.moduleName + '_directive';
      this.template('_module/_directive.js', path.join(this.modulePath, this.directiveFile + '.js'), this);
      this.copy('_module/_templates/_templateDirective.html',
              path.join(this.modulePath, 'templates', this.moduleName + 'Directive.tpl.html'));
    }
    if (this.services) {
      this.serviceFile = this.moduleName + '_service';
      this.copy('_module/_service.js', path.join(this.modulePath, this.serviceFile + '.js'));
    }

    this.template('_module/_controller.js', path.join(this.modulePath, this.controllerFile + '.js'), this);
    // TODO add module tests files
  },
  injectDependenciesToApp: function() {
    angularUtils.injectIntoFile(
            this.appPath,
            path.join(this.moduleRelativePath, this.controllerFile),
            this.angularModuleName
            );
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
  addTranslations: function() {

    var translationsPath = 'app/scripts/modules/lang/translations';
    var translations = fs.readdirSync(translationsPath);
    var placeholderTranslation = this.engine("\"module.<%= moduleName %>\":{ \"moduleName\" : \"<%= moduleNameTitle %>\"},", this);

    translations.forEach(function(file) {
      var filePath = path.join(translationsPath, file);
      angularUtils.injectIntoJSON(
              filePath,
              "\"IMPORTANT_NEEDLE_DATA\": \"do not remove\"",
              placeholderTranslation
              );
    });
  },
  registerModule: function() {
    var module = {
      'name': this.moduleName,
      'navBar': this.addToNav
    };
    angularUtils.registerModule(this.appPath, module);
  }

});


module.exports = BlankModuleGenerator;
