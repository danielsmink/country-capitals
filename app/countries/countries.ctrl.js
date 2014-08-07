'use strict';

/*
 * Countries controller
 */
angular
  .module('CountriesCtrl', CountriesCtrl);

/* @ngInject */
function CountriesCtrl ($location, $timeout, geonamesService, geonamesCache) {
  var countries = this,
    cache = geonamesCache.get('countries');

  countries.isLoading = true;

  countries.ordering = 'countryName';

  countries.go = function (path) {
    $location.path(path);
  };

  // Use cache if the country list is already cached
  if (cache) {
    countries.geonames = cache;
    countries.isLoading = false;
  } else {
    geonamesService.getCountries()
      .success(function (geonames) {
        geonamesCache.put('countries', geonames.geonames);
        countries.geonames = geonamesCache.get('countries');
      }, $timeout(function(){
        countries.isLoading = false;
      }, 1000))
      .error(function () {
        countries.error = 'Error retrieving country list';
      });
  }
}
