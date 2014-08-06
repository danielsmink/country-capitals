'use strict';

/*
 * Contains a service to communicate with the Geonames API
 */
angular
  .module('countryCapitals')
  .factory('geonamesCache', geonamesCache);

/* @ngInject */
function geonamesCache ($cacheFactory) {
  return $cacheFactory(name);
}