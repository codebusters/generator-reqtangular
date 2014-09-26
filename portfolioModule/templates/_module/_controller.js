'use strict';
define([
  'angular',
  './<%= routeFile %>',
  './<%= serviceFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', [
    '<%= angularModuleName %>.routing',
    '<%= angularModuleName %>.service',
    'simplePagination'
  ])
          .controller('<%= moduleControllerClass %>',
          [
            '$scope',
            '$http',
            '$log',
            '$translate',
            '<%=moduleName%>Service',
            'Pagination',
            function(
                    $scope,
                    $http,
                    $log,
                    $translate,
                    service,
                    Pagination) {
              //Init pagination
              $scope.pagination = Pagination.getNew(6);

              service.getAllEntries(function(entries) {
                $scope.portFolioEntries = entries;
                $scope.pagination.numPages = Math.ceil(entries.length / $scope.pagination.perPage);
              });
              /**
               * Filtering entries
               * @param {type} entry
               * @returns {entry}
               */
              $scope.filterPortfolioEntries = function(entry) {
                //Global filtering options (published and language)
                if ($translate.use() === entry.lang) {
                  return entry;
                }
              };
            }]);

});