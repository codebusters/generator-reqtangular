'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('<%=angularModuleName%>.service', ['AppModule.configuration']);

  module.factory('<%=moduleName%>Service',
          ['APP', '$http', function(APP, $http) {
              return {
                getAllEntries: function(cb) {
                  //read img data for now from mocked data from mockedData.json file.
                  $http.get('scripts/modules/portfolio/mockedData.json').
                          success(function(data) {
                    cb(data)
                  });
                }
              };
            }]);
});