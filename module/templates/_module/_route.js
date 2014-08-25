'use strict';
define([
  'angular',
  'text!./templates/<%= moduleName %>.tpl.html'
], function(angular, template) {
  angular.module('<%= angularModuleName %>.routing', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/<%= moduleName %>', { 
      template: template,
      controller: '<%= moduleControllerClass %>'
    }).otherwise({
      redirectTo: '/'
    });
  });
});