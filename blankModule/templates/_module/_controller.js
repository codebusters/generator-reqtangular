'use strict';
        define([
        'angular',
        './<%= routeFile %>'
        <% if (directives) { %>
        ,'./<%= directiveFile %>'
        <% } %>
        <% if (services) { %> 
        ,'./<%= serviceFile %>'
        <% } %>
], function(angular) {
angular.module(
        '<%= angularModuleName %>',
        ['AppModule.configuration', '<%= angularModuleName %>.routing'
        <% if (directives) { %>
          ,'<%= angularModuleName%>.directive'
        <% } %>
        <% if (services) { %> 
          ,'<%= angularModuleName%>.service'
        <% } %>
        ]
        )
        .controller('<%= moduleControllerClass %>',
        [
                'APP',
                '$scope',
                '$log',
                <% if (services) { %>
                  '<%=moduleName%>Service',
                <% } %>
                function(
                        APP,
                        $scope,
                        $log
                       <% if (services) { %>
                       ,service
                       <% } %>
                      ) {
                  //Here your code
                }]);
});