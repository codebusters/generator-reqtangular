'use strict';
define([
  'angular',
  './<%= routeFile %>',
  './<%= serviceFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', ['<%= angularModuleName %>.routing', '<%= angularModuleName %>.service'])
          .controller('<%= moduleControllerClass %>', ['$scope', '$http', '$log', '<%=moduleName%>Service',
    function($scope, $http, $log, service) {
      service.getAllEntries(function(entries) {
        $scope.portFolioEntries = entries;
      });
    }]);

});