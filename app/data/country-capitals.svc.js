'use strict';

/*
 * Contains a service to communicate with the Geonames API
 */
angular
  .module('countryCapitals')
  .factory('geonamesService', geonamesService);

/* @ngInject */
function geonamesService (geoApiUsername) {

  var service = {
    getCountries: getCountries
  };
  return service;

  ////////////
  function getCountries () {
    return geoApiUsername;
  }
}