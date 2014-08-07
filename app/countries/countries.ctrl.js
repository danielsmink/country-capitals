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

  $timeout(function(){
    if(countries.geonames || countries.error) {
      countries.isLoading = false;
    } else {
      //Shouldn't be possible to get here
      countries.error = 'Error';
    }
  }, 1000);
}
