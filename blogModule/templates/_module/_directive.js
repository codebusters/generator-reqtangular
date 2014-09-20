'use strict';
define([
  'angular',
  'text!./templates/<%=moduleName%>Categories.tpl.html'
], function(angular, template) {
  angular.module('<%=angularModuleName%>.directive', [
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
                template: template,
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
            }]);
});