'use strict';
define([
  'angular',
  './<%= routeFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', ['<%= angularModuleName %>.routing'])
          .controller('<%= moduleControllerClass %>', ['$scope', '$http', '$log',
    function($scope, $http, $log) {
      $scope.formData = {};
      $scope.processForm = function() {
        $http({
          method: 'POST',
          url: 'scripts/modules/contact/templates/contact.php',
          data: $scope.formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status, headers, config) {
          //Here cusccess behaviour
        }).error(function(data, status, headers, config) {
          //Here error behaviour
        });
      };
    }]);

});