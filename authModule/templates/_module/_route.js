'use strict';
define([
  'angular',
  'text!./templates/<%=moduleName%>.tpl.html'
], function(angular, template) {
  angular.module('<%=angularModuleName%>.routing', ['ngRoute']).config(function($routeProvider,$httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider.when('/<%=moduleName%>', { 
      template: template,
      controller: '<%=moduleControllerClass%>'
    }).otherwise({
      redirectTo: '/'
    });
  });
});