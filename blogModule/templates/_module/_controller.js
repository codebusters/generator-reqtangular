'use strict';
define([
  'angular',
  './<%= routeFile %>',
  './<%= serviceFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', ['<%= angularModuleName %>.routing', '<%= angularModuleName %>.service'])
          /**
           * Blog entries controller
           * @param {type} $scope
           * @param {type} $http
           * @param {type} $log
           * @param {type} service
           * @returns {undefined}
           */
          .controller('<%= moduleControllerClass %>', ['$scope', '$http', '$log', '<%=moduleName%>Service',
    function($scope, $http, $log, service) {

      $scope.template = {name: '<%=moduleName%>Entries.html', url: 'scripts/modules/blog/templates/partials/<%=moduleName%>Entries.tpl.html'};

      service.getAllCategories(function(categories) {
        $scope.blogCategories = categories;
      });
      service.getEntriesByLang(getBrowserLang(), function(entries) {
        $scope.blogEntries = entries;
      });
    }])
          /**
           * Blog entry (detail) controller
           * @param {type} $scope
           * @param {type} $http
           * @param {type} $log
           * @param {type} $routeParams
           * @param {type} service
           * @returns {undefined}
           */
          .controller('<%= moduleControllerClass %>Detail', ['$scope', '$http', '$log', '$routeParams', '<%=moduleName%>Service',
    function($scope, $http, $log, $routeParams, service) {

      $scope.template = {name: '<%=moduleName%>Entry.html', url: 'scripts/modules/blog/templates/partials/<%=moduleName%>Entry.tpl.html'};

      service.getEntryById($routeParams.blogEntryId, function(entry) {
        $scope.blogEntry = entry;
      });
    }]);

});

/**
 * Get actual browser language.
 * @returns {String}
 */
function getBrowserLang() {
  var lang = navigator.language || navigator.userLanguage;
  var language_complete = lang.split("-");
  return (language_complete[0]);
}