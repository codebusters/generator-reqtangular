'use strict';
define([
  'angular',
  './<%= routeFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', ['<%= angularModuleName %>.routing'])
          .controller('<%= moduleControllerClass %>', ['$scope', '$log',
    function($scope, $log) {
      
    }]);

});