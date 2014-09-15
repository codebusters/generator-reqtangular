'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('Lang.utils', ['AppModule.configuration']);

  module.factory('langModuleUtils',
          ['APP', function(APP) {
              return {
                showLangsBar: function() {
                  var result = false;
                  if (APP.langs.length > 1) {
                    result = true;
                  }
                  return result;
                },
                getLangs : function() {
                  return APP.langs;
                }
              };
            }]);
});