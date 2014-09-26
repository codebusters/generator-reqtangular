'use strict';
define([
  'angular',
  './directive',
  './utils'
], function(angular) {
  var module = angular.module('LangModule',
          [
            'pascalprecht.translate',
            'Lang.directive',
            'Lang.utils',
            'AppModule.configuration'
          ]);
  module.config(['$translateProvider', function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        //TODO improve translation dir to relative path
        prefix: 'scripts/modules/lang/translations/',
        suffix: '.json'
      });
    }]);

  module.controller('LangController', [
    '$scope', '$translate', 'langModuleUtils', 'APP'
            , function($scope, $translate, langModuleUtils, APP) {
      if (!$translate.use()) {
        $scope.selectedLang = APP.DEFAULT_LANG;
        $translate.use(APP.DEFAULT_LANG);
      }
      $scope.showLangs = langModuleUtils.showLangsBar();
      $scope.langs = langModuleUtils.getLangs();
      $scope.changeLang = function(key) {
        $scope.selectedLang = key;
        $translate.use(key);
      };
    }]);

  /**
   * Get actual browser language.
   * @returns {String}
   */
  function getBrowserLang() {
    var lang = navigator.language || navigator.userLanguage;
    var language_complete = lang.split("-");
    return (language_complete[0]);
  }
});