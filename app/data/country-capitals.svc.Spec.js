'use strict';

/*
 * Contains a unittest for the Geonames API service
 */

describe('Servicefactory: geonamesService', function() {

  // load the controller's module
  beforeEach(module('countryCapitals'));

  // Test countries
  it('should pull in countries from the Geonames API',
    inject(function(geonamesService, $httpBackend){

    // Catch and mock JSONP request
    $httpBackend.expect('JSONP',
      'http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&username=danielsmink')
      .respond(200,
      {
        country: 'Netherlands'
      });

    // Retrieve countries
    geonamesService.getCountries().then(function(data) {
      expect(data.data.country).toBe('Netherlands');
    });

    $httpBackend.flush();
  }));

  // Test single Country
  it('should pull in a country from the Geonames API',
    inject(function(geonamesService, $httpBackend){

      // Catch and mock JSONP request
      $httpBackend.expect('JSONP',
          'http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=&username=danielsmink')
        .respond(200,
        {
          country: 'Netherlands'
        });

      // Retrieve country
      geonamesService.getCountry().then(function(data) {
        expect(data.data.country).toBe('Netherlands');
      });

      $httpBackend.flush();
    }));

  // Test capital
  it('should pull in a Capital from the Geonames API based on the provided country',
    inject(function(geonamesService, $httpBackend){

      // Catch and mock JSONP request
      $httpBackend.expect('JSONP',
          'http://api.geonames.org//searchJSON?callback=JSON_CALLBACK&country=&isNameRequired=true&username=danielsmink')
        .respond(200,
        {
          capital: 'Amsterdam'
        });

      // Retrieve capital
      geonamesService.getCapital('Netherlands').then(function(data) {
        expect(data.data.capital).toBe('Amsterdam');
      });

      $httpBackend.flush();
    }));

  // Test neighbours
  it('should pull in the neighbours from the Geonames API based on the provided country',
    inject(function(geonamesService, $httpBackend){

      // Catch and mock JSONP request
      $httpBackend.expect('JSONP',
          'http://api.geonames.org//neighboursJSON?callback=JSON_CALLBACK&geonameId=Netherlands&username=danielsmink')
        .respond(200,
        {
          neighbour: 'Belgium'
        });

      // Retrieve capital
      geonamesService.getNeighbours('Netherlands').then(function(data) {
        expect(data.data.neighbour).toBe('Belgium');
      });

      $httpBackend.flush();
    }));

  // Test set iso code
  it('should correct set the iso code to the given value',
    inject(function(geonamesService){
      // Set test value to isoCode and test if it's equal to that value
      geonamesService.setIsoCode('test');
      expect(geonamesService.isoCode).toBeDefined();
      expect(geonamesService.isoCode).toBe('test');
    }));

});
