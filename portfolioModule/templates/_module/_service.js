'use strict';
define([
  'angular'
], function(angular) {
  var module = angular.module('<%=angularModuleName%>.service', ['AppModule.configuration']);

  module.factory('<%=moduleName%>Service',
          ['APP', '$http', function(APP, $http) {
              //read img data for now from mocked data from mockedData.json file.
              /*Example how to implement a real REST api call:
               return $resource(APP.ENV.API_END_POINT + 'blog/entries', {}, {
               save: {method: 'GET'}
               });*/
              var mockedDataFile = 'scripts/modules/portfolio/mockedData.json';
              return {
                /**
                 * Get all portfolio entries
                 * @returns JSON []
                 */
                getAllEntries: function(cb) {
                  //read img data for now from mocked data from mockedData.json file.
                  $http.get(mockedDataFile).
                          success(function(data) {
                    cb(data.entries)
                  });
                }
              };
            }]);
});