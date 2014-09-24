'use strict';
define([
  'angular',
  'text!./templates/<%=moduleName%>Directive.tpl.html'
], function(angular,templateDirective) {
  angular.module('<%=angularModuleName%>.directive',
          [
           <% if (services) { %> 
             '<%= angularModuleName%>.service'
          <% } %>
          ]).directive('<%=moduleName%>DirectiveExample',
          [
            '$rootScope',
            <% if (services) { %>
            '<%=moduleName%>Service',
            <% } %>
            function(
                    $rootScope
            <% if (services) { %>
                    ,service
            <% } %>
                    ) {
              return {
                restrict: 'E',
                template: templateDirective,
                controller: function() {
                  //Here directive code
                },
                controllerAs: 'panel'
              };
            }
          ]);
});