'use strict';

/*
 * Contains a service to communicate with the Geonames API
 */
angular
  .module('countryCapitals')
  .factory('geonamesService', geonamesService);

/* @ngInject */
function geonamesService ($http, geoApiUsername, apiBaseUrl) {

  var service = {
    getCountries: getCountries
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

  return service;
}