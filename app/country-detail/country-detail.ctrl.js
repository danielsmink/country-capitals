'use strict';

/*
 * Country detail controller
 */
angular
  .module('CountryDetailCtrl', CountryDetailCtrl);

/* @ngInject */
function CountryDetailCtrl ($routeParams, $location, geonamesService, geonamesCache) {
  var country = this,
    countryName = $routeParams.country,
    countryCode = geonamesService.isoCode,
    cache = geonamesCache.get(countryCode);

  country.detail = {
    country: '',
    capital: '',
    neighbours: ''
  };

  country.go = function (path, isoCode) {
    geonamesService.setIsoCode(isoCode);
    $location.path(path);
  };

  // Use cache if the country is already cached
  if (cache) {
    country.detail = cache;
  } else {
    // Get country info
    geonamesService.getCountry()
      .success(function (detail) {
        if(detail.geonames.length === 0) {
          country.error = 'Error retrieving country';
        } else {
          country.detail.country = detail.geonames[0];
          // Get capital
          geonamesService.getCapital(country.detail.country)
            .success(function (capital) {
              if(capital.geonames.length === 0) {
                country.error = 'Error retrieving capital info';
              } else {
                country.detail.capital = capital.geonames[0];
                geonamesService.getNeighbours(country.detail.country.geonameId)
                  .success(function (neighbours) {
                    country.detail.neighbours = neighbours.geonames;
                    // Cache both country and capital info
                    geonamesCache.put(countryCode, country.detail);
                  })
                  .error(function () {
                    country.error = 'Error retrieving neighbours';
                  });
              }
            })
            .error(function () {
              country.error = 'Error retrieving capital info';
            });
        }
      })
      .error(function () {
        country.error = 'Error retrieving country list';
      });
  }

}