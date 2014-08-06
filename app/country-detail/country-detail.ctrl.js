'use strict';

/*
 * Country detail controller
 */
angular
  .module('CountryDetailCtrl', CountryDetailCtrl);

/* @ngInject */
function CountryDetailCtrl ($routeParams, geonamesService, geonamesCache) {
  var country = this,
    countryName = $routeParams.country,
    countryCode = geonamesService.isoCode,
    cache = geonamesCache.get(countryCode);

  // Use cache if the country is already cached
  if (cache) {
    country.detail = cache;
  } else {
    geonamesService.getCountry(countryName)
      .success(function (detail) {
        if(detail.geonames.length === 0) {
          country.error = 'Error retrieving country';
        } else {
          geonamesCache.put(countryCode, detail.geonames[0]);
          country.detail = geonamesCache.get(countryCode);
        }
      })
      .error(function () {
        country.error = 'Error retrieving country list';
      });
  }

}