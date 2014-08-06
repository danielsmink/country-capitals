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
    isoCode: isoCode,
    setIsoCode: setIsoCode
  };

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

  function getCountry (countryName) {

    // return Promise
    return $http(
      {
        method: 'JSONP',
        url: apiBaseUrl + '/searchJSON',
        params: {
          callback: 'JSON_CALLBACK',
          username: geoApiUsername,
          q: countryName,
          country: service.isoCode,
          name_equals: countryName,
          isNameRequired: true
        }
      }
    );
  }

  function setIsoCode (isoCode) {
    service.isoCode = isoCode;
  }

  return service;
}