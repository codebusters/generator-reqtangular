/*jshint unused: vars */
require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    'angular-animate': '../../bower_components/angular-animate/angular-animate',
    'angular-cookies': '../../bower_components/angular-cookies/angular-cookies',
    'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-route': '../../bower_components/angular-route/angular-route',
    'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
    'angular-scenario': '../../bower_components/angular-scenario/angular-scenario',
    'angular-touch': '../../bower_components/angular-touch/angular-touch',
    'angular-translate': '../../bower_components/angular-translate/angular-translate',
    'angular-translate-loader-static-files': '../../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
    'angular-translate-storage-local': '../../bower_components/angular-translate-storage-local/angular-translate-storage-local',
    'angular-translate-storage-cookie': '../../bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.min',
    jquery: '../../bower_components/jquery/dist/jquery.min',
    text: '../../bower_components/requirejs-text/text',
    simplePagination: '../../bower_components/ng-simplePagination/simplePagination'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': [
      'angular'
    ],
    'angular-cookies': [
      'angular'
    ],
    'angular-sanitize': [
      'angular'
    ],
    'angular-resource': [
      'angular'
    ],
    'angular-animate': [
      'angular'
    ],
    'angular-touch': [
      'angular'
    ],
    'angular-translate': [
      'angular'
    ],
    'angular-translate-loader-static-files': [
      'angular',
      'angular-translate-storage-local'
    ],
    'angular-translate-storage-local': [
      'angular',
      'angular-translate'
    ],
    'angular-translate-storage-cookie': [
      'angular',
      'angular-translate-storage-local'
    ],
    simplePagination: [
      'angular'
    ],
    bootstrap : [
      'jquery'
    ],
    'angular-mocks': {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    }
  },
  priority: [
    'angular',
    'angular-translate-loader-static-files'
  ],
  packages: [
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'angular',
  'app',
  'angular-route',
  'angular-cookies',
  'angular-sanitize',
  'angular-resource',
  'angular-animate',
  'angular-touch',
  'simplePagination',
  'angular-translate',
  'angular-translate-loader-static-files',
  'angular-translate-storage-local',
  'angular-translate-storage-cookie',
  'bootstrap'
], function(angular, app, ngRoutes, ngCookies, ngSanitize, ngResource, ngAnimate, ngTouch) {
  'use strict';
  angular.element().ready(function() {
    angular.bootstrap(document, [app['name']]);
  });
});
