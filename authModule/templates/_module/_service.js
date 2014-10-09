'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('<%=angularModuleName%>.service', ['AppModule.configuration', 'Main.utils']);

  module.factory('<%=moduleName%>Service',
          ['APP', '$http', function(APP, $http) {
              return {
                helloWorld: function() {
                  return "Hello";
                }
              };
            }]);

  module.factory('AuthenticationService', function() {
    var auth = {
      isLogged: false
    };

    return auth;
  });
  module.factory('UserService', ['$http', 'mainModuleUtils', function($http, mainModuleUtils) {
      return {
        logIn: function(email, password) {
          var authModule = mainModuleUtils.getModule('auth');
          return $http.post(authModule.rest + '/login', {email: email, password: password});
        },
        logOut: function() {

        }
      };
    }]);
  module.factory('TokenInterceptor', function($q, $window, $location, AuthenticationService) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      requestError: function(rejection) {
        return $q.reject(rejection);
      },
      /* Set Authentication.isAuthenticated to true if 200 received */
      response: function(response) {
        if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
          AuthenticationService.isAuthenticated = true;
        }
        return response || $q.when(response);
      },
      /* Revoke client authentication if 401 is received */
      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
          delete $window.sessionStorage.token;
          AuthenticationService.isAuthenticated = false;
          $location.path("/auth");
        }

        return $q.reject(rejection);
      }
    };
  });
});