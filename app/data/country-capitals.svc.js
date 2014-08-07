'use strict';

/*
 * Contains a service to communicate with the Geonames API
 */
angular
  .module('countryCapitals')
  .factory('geonamesService', geonamesService);

/* @ngInject */
function geonamesService ($http, geoApiUsername, apiBaseUrl) {

  var isoCode = '',
    service = {
    getCountries: getCountries,
    getCountry: getCountry,
    getCapital: getCapital,
    getNeighbours: getNeighbours,
    isoCode: isoCode,
    setIsoCode: setIsoCode
  };

  // Retrieve a list of countries
  function getCountries () {

    // return Promise
    return $http(
      {
        method: 'JSONP',
        url: apiBaseUrl + '/countryInfoJSON',
        params: {
          callback: 'JSON_CALLBACK',
          username: geoApiUsername
        }
      }
    );
  }

  // Retrieve a single country
  function getCountry () {

    // return Promise
    return $http(
      {
        method: 'JSONP',
        url: apiBaseUrl + '/countryInfoJSON',
        params: {
          callback: 'JSON_CALLBACK',
          username: geoApiUsername,
          country: service.isoCode
        }
      }
    );
  }

  // Retrieve capital info from Geonames API
  function getCapital (country) {

    // return Promise
    return $http(
      {
        method: 'JSONP',
        url: apiBaseUrl + '/searchJSON',
        params: {
          callback: 'JSON_CALLBACK',
          username: geoApiUsername,
          q: country.capital,
          country: service.isoCode,
          name_equals: country.capital,
          isNameRequired: true
        }
      }
    );
  }

  // Retrieve country neighbours from Geonames API
  function getNeighbours (geonameId) {

    // return Promise
    return $http(
      {
        method: 'JSONP',
        url: apiBaseUrl + '/neighboursJSON',
        params: {
          callback: 'JSON_CALLBACK',
          username: geoApiUsername,
          geonameId: geonameId
        }
      }
    );
  }

  // Set isoCode so it can be easily reused
  function setIsoCode (isoCode) {
    service.isoCode = isoCode;
  }

  return service;
}