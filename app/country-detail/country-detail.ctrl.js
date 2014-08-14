'use strict';

/*
 * Country detail controller
 */
angular
  .module('CountryDetailCtrl', CountryDetailCtrl);

/* @ngInject */
function CountryDetailCtrl ($timeout, $routeParams, $location, geonamesService, geonamesCache) {
  var country = this;

  country.countryParams = $routeParams.country.split('-');
  country.countryCode = country.countryParams[0];
  country.cache = geonamesCache.get(country.countryCode);
  country.isLoading = true;

  geonamesService.setIsoCode(country.countryCode);

  country.detail = {
    country: '',
    capital: '',
    neighbours: ''
  };

  // Use cache if the country is already cached
  if (country.cache) {
    country.detail = country.cache;
    country.isLoading = false;
  } else {
    // @TODO refactor to prevent deep nesting and unreadable code
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
                // If no capital is found we assume the country has no capital
                country.detail.capital ={
                  name: 'No capital',
                  population: '0'
                };
                geonamesCache.put(country.countryCode, country.detail);
              } else {
                country.detail.capital = capital.geonames[0];
                geonamesService.getNeighbours(country.detail.country.geonameId)
                  .success(function (neighbours) {
                    country.detail.neighbours = neighbours.geonames;
                    // Cache both country and capital info
                    geonamesCache.put(country.countryCode, country.detail);
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
      }, $timeout(function(){
        country.isLoading = false;
      }, 1000));
  }
}