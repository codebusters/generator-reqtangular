'use strict';
define([
  'angular',
  './<%= routeFile %>',
  './<%= serviceFile %>',
  './<%= directiveFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>',
          [
            '<%= angularModuleName %>.routing',
            '<%= angularModuleName %>.service',
            '<%= angularModuleName %>.directive'
          ])
          .controller('<%= moduleControllerClass %>',
          [
            '$rootScope',
            '$scope',
            '$log',
            '$location',
            '$window',
            'UserService',
            'AuthenticationService',
            function(
                    $rootScope,
                    $scope,
                    $log,
                    $location,
                    $window,
                    UserService,
                    AuthenticationService
                    ) {
              ////////////////
              $scope.submitted = false;
              // hide success message
              $scope.showMessage = false;
              // method called from shakeThat directive
              $scope.submit = function() {
                // show success message
                $scope.showMessage = true;
              };

              $scope.logout = function logout() {
                if (AuthenticationService.isLogged) {
                  AuthenticationService.isLogged = false;
                  $rootScope.isLogged = false;
                  $rootScope.userLogged = null;
                  $rootScope.messageClass = null;
                  $rootScope.message = null;
                  $window.sessionStorage.removeItem('token');
                }
              };
            }]);

});