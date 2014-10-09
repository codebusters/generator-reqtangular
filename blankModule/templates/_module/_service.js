'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('<%=angularModuleName%>.service', ['AppModule.configuration']);

  module.factory('<%=moduleName%>Service',
          ['APP', '$http', function(APP, $http) {
              return {
                /**
                 * 
                 * @returns {String}
                 */
                helloWorld: function() {
                  return "Hello";
                }
              };
            }]);
});