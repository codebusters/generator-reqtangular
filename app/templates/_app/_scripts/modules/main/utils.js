'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('Main.utils', ['AppModule.configuration']);

  module.factory('mainModuleUtils',
          ['APP', function(APP) {
              return {
                showMainMenu: function() {
                  var result = false;
                  var showModulesNumb = 0;
                  APP.modules.forEach(function(item) {
                    if (item.navBar) {
                      showModulesNumb++;
                      if (showModulesNumb > 1) {
                        result = true;
                      }
                    }
                  });
                  return result;
                },
                /**
                 * Get module configuration by module name.
                 * @param {String} moduleName
                 * @returns {JSON}
                 */
                getModule: function(moduleName) {
                  var result;
                  APP.modules.forEach(function(module) {
                    if (module.name === moduleName) {
                      result = module;
                    }
                  });
                  return result;
                }
              };
            }]);
});