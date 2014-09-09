/*jshint unused: vars */
define(['angular',
  './configuration',
  'modules/lang/controller',
  'modules/main/controller',
  'modules/home/controller'

]/*deps*/, function(angular)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name codebustersJsApp
   * @description
   * # codebustersJsApp
   *
   * Main module of the application.
   */
  return angular
          .module('codebustersJsApp',
          [
            'LangModule',
            'MainModule',
            'HomeModule',
            /*angJSDeps*/
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'ngAnimate',
            'ngTouch',
            'pascalprecht.translate'
          ]);
});
