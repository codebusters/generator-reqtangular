'use strict';
define([
  'angular',
  './<%= serviceFile %>'
], function(angular) {
  angular.module('<%=angularModuleName%>.directive',
          [
            '<%= angularModuleName%>.service'
          ]).directive('<%=moduleName%>DirectiveExample',
          [
            '$rootScope',
            '<%=moduleName%>Service',
            function(
                    $rootScope
                    ) {
              return {
                restrict: 'E',
//                template: templateDirective,
                controller: function() {
                  //Here directive code
                },
                controllerAs: 'panel'
              };
            }
          ])
          /**
           * 
           */
          .directive('shakeThat',
          ['$animate', '$window', '$rootScope', '$translate', '$log', 'UserService', 'AuthenticationService',
            function($animate, $window, $rootScope, $translate, $log, UserService, AuthenticationService) {
              return {
                require: '^form',
                scope: {
                  submit: '&',
                  submitted: '='
                },
                link: function(scope, element, attrs, form) {
                  // listen on submit event
                  element.on('submit', function() {
                    // tell angular to update scope
                    scope.$apply(function() {
                      // everything ok -> call submit fn from controller
                      if (form.$valid) {
                        UserService.logIn(form.email.$modelValue, form.password.$modelValue).success(function(data) {
                          AuthenticationService.isLogged = true;
                          $window.sessionStorage.setItem('token', data.token);
                          $rootScope.isLogged = true;
                          $rootScope.userLogged = data.user;
                          $rootScope.messageClass = 'alert alert-success';
                          $translate.refresh();
                          $rootScope.message = $translate.instant('module.<%=moduleName%>.welcome') + ' ' + data.user.name;
                          //Translations with promises
//                          $translate('module.auth.welcome')
//                                  .then(function(translation) {
//                            alert(translation)
//                            $log.debug(translation.welcome);
//                          });
                          // translate instantly from the internal state of loaded translation
                          $log.debug($translate.instant('module.<%=moduleName%>.welcome'));
                        }).error(function(status, data) {
                          $rootScope.messageClass = 'alert alert-danger';
                          $rootScope.message = $translate.instant('module.<%=moduleName%>.error_' + data);
                        });
                        return scope.submit();
                      }

                      // show error messages on submit
                      scope.submitted = true;
                      // shake that form
                      $animate.addClass(element, 'shake', function() {
                        $animate.removeClass(element, 'shake');
                      });
                    });
                  });
                }
              };
            }]);
});