'use strict';
define([
  'angular',
  //Self module components
  './directive',
  './utils'
], function(angular) {
  var module = angular.module('MainModule',
          [
            'Main.directive',
            'Main.utils',
            'AppModule.configuration'
          ]);

  module.controller('MainController', [
    '$scope',
    '$log',
    'APP',
    'APP_INFO',
    'mainModuleUtils',
    function(
            $scope,
            $log,
            APP,
            APP_INFO,
            mainModuleUtils
            )
    {
      $scope.envMode = APP.ENV_MODE;
      $scope.appInfo = APP_INFO;
      $scope.showMainMenu = mainModuleUtils.showMainMenu();
    }]);

  module.controller('MainMenuController', [
    '$scope',
    function(
            $scope
            )
    {
      this.menu = 'HOME';
      this.selectMenu = function(setMenu) {
        this.menu = setMenu;
      };
      this.isSelected = function(checkTab) {
        return this.menu === checkTab;
      };
      this.getMenuSelected = function() {
        return this.menu;
      };
    }]);

});