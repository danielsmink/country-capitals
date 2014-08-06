'use strict';

/*
 * Route configuration
 */

angular
  .module('countryCapitals')
  .config(config);

/* @ngInject */
function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './js/partials/home/home.html'
    })
    .when('/countries', {
      templateUrl: './js/partials/countries/countries.html'
    })
    .when('/countries/:country', {
      templateUrl: './js/partials/country-detail/country-detail.html'
    })
    .when('/error', {
      template : '<p>Error Page Not Found</p>'
    })
    .otherwise({
      redirectTo : '/error'
    });
}