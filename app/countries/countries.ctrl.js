'use strict';

/*
 * Countries controller
 */
angular
  .module('CountriesCtrl', CountriesCtrl);

/* @ngInject */
function CountriesCtrl ($scope, geonamesService) {
  this.name = geonamesService.getCountries();
}
