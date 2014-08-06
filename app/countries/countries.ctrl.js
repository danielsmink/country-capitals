'use strict';

/*
 * Countries controller
 */
angular
  .module('CountriesCtrl', CountriesCtrl);

/* @ngInject */
function CountriesCtrl (geonamesService) {
  var countries = this;

  geonamesService.getCountries()
    .success(function (geonames) {
      countries.geonames = geonames.geonames;
    })
    .error(function () {
      countries.error = 'Error retrieving country list';
    });
}
