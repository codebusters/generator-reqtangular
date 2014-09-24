'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('<%=angularModuleName%>.service', ['AppModule.configuration']);

  module.factory('<%=moduleName%>Service',
          ['APP', '$http', function(APP, $http) {
              return {
                /**
                 * Get all categories
                 * @param {type} cb
                 * @returns {undefined}
                 */
                helloWorld: function() {
                  return "Hello";
                }
              };
            }]);
});