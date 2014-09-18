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
              var mockedDataFile = 'scripts/modules/blog/mockedData.json';
              return {
                /**
                 * Get all categories
                 * @param {type} cb
                 * @returns {undefined}
                 */
                getAllCategories: function(cb) {
                  $http.get(mockedDataFile).
                          success(function(data) {
                    cb(data.categories);
                  });
                },
                /**
                 * Get all blog entries
                 * @param {type} cb
                 * @returns {undefined}
                 */
                getAllEntries: function(cb) {
                  $http.get(mockedDataFile).
                          success(function(data) {
                    cb(data.entries);
                  });
                },
                /**
                 * Get all blog entries
                 * @param {type} lang
                 * @param {type} cb
                 * @returns {undefined}
                 */
                getEntriesByLang: function(lang, cb) {
                  $http.get(mockedDataFile).
                          success(function(data) {
                    var entries = [];
                    data.entries.forEach(function(entry) {
                      if (entry.lang === lang) {
                        entries.push(entry);
                      }
                    });
                    cb(entries);
                  });
                },
                /**
                 * Get blog entry by id
                 * @param {type} blogEntryId
                 * @param {type} cb
                 * @returns {undefined}
                 */
                getEntryById: function(blogEntryId, cb) {
                  $http.get(mockedDataFile).
                          success(function(data) {
                    var resultEntry = {};
                    data.entries.forEach(function(entry) {
                      if (entry.id + '' === blogEntryId) {
                        resultEntry = entry;
                      }
                    });
                    cb(resultEntry);
                  });
                },
                /**
                 * Get blog entries bu author
                 * @param {type} authorId
                 * @param {type} cb
                 * @returns {undefined}
                 */
                getEntriesByAuthorId: function(authorId, cb) {
                  $http.get(mockedDataFile).
                          success(function(data) {
                    var entries = [];
                    data.entries.forEach(function(entry) {
                      if (entry.author.id + '' === authorId) {
                        entries.push(entry);
                      }
                    });
                    cb(entries);
                  });
                }
              };
            }]);
});