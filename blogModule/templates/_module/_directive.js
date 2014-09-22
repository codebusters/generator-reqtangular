'use strict';
define([
  'angular',
  'text!./templates/<%=moduleName%>Categories.tpl.html',
  'text!./templates/<%=moduleName%>LastEntries.tpl.html'
], function(angular, templateCategories, templateLastEntries) {
  angular.module('<%=angularModuleName%>.directive',
          [
            '<%= angularModuleName %>.service'
          ]).directive('<%=moduleName%>Categories',
          [
            '$rootScope',
            '<%=moduleName%>Service',
            function(
                    $rootScope,
                    service
                    ) {
              return {
                restrict: 'E',
                template: templateCategories,
                controller: function() {
                  $rootScope.categoryId = null;
                  service.getAllCategories(function(categories) {
                    $rootScope.blogCategories = categories;
                  });
                  $rootScope.setCategoryId = function(categoryId) {
                    $rootScope.categoryId = categoryId;
                  };
                },
                controllerAs: 'panelCategories'
              };
            }
          ]
          ).directive('<%=moduleName%>LastEntries',
          [
            '$rootScope',
            '$translate',
            '<%=moduleName%>Service',
            function(
                    $rootScope,
                    $translate,
                    service
                    ) {
              return {
                restrict: 'E',
                template: templateLastEntries,
                controller: function() {
                  //Hard coded last 3 entries.
                  $translate.use()
                  service.getLastEntries($translate.use(), 3, function(entries) {
                    $rootScope.lastEntries = entries;
                  });
                },
                controllerAs: 'panelLastEntries'
              };
            }
          ]
          );
});