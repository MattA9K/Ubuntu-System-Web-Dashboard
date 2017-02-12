'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$interpolateProvider', function($locationProvider, $routeProvider, $interpolateProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/view1'});

  // PREVENT ANGULAR/DJANGO CONFLICT:
    $interpolateProvider.startSymbol('[#');
    $interpolateProvider.endSymbol('#]');
}]);
