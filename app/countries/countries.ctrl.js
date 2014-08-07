'use strict';

/*
 * Countries controller
 */
angular
  .module('CountriesCtrl', CountriesCtrl);

/* @ngInject */
function CountriesCtrl ($location, geonamesService, geonamesCache) {
  var countries = this,
    cache = geonamesCache.get('countries');

  countries.ordering = 'countryName';

  countries.go = function (path) {
    $location.path(path);
  };

  // Use cache if the country list is already cached
  if (cache) {
    countries.geonames = cache;
  } else {
    geonamesService.getCountries()
      .success(function (geonames) {
        geonamesCache.put('countries', geonames.geonames);
        countries.geonames = geonamesCache.get('countries');
      })
      .error(function () {
        countries.error = 'Error retrieving country list';
      });
  }
}