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
      templateUrl: './js/partials/countries/countries.html',
      controller: 'CountriesCtrl',
      controllerAs: 'countries'
    })
    .when('/countries/:country/capital', {
      templateUrl: './js/partials/country-detail/country-detail.html',
      controller: 'CountryDetailCtrl',
      controllerAs: 'country'
    })
    .when('/error', {
      template : '<p>Error Page Not Found</p>'
    })
    .otherwise({
      redirectTo : '/error'
    });
}