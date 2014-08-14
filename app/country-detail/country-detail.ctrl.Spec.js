'use strict';

/*
 * CountryDetailCtrl controller unit test
 */

describe('Controller: CountryDetailCtrl', function() {

  var geonamesCache,
    cache = false;

  // load the controller's module
  beforeEach(module('countryCapitals', function($provide){
    // Add mock cache service
    geonamesCache = {};

    geonamesCache.get = function(){
      return cache;
    };
    geonamesCache.put = function(){
      cache = true;
    };
    geonamesCache.remove = function(){
      cache = false;
    }

    $provide.value('geonamesCache', geonamesCache);
  }));

  var ctrl,
    scope,
    $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $routeParams, _$location_){
    $location = _$location_;
    scope = $rootScope.$new();
    $routeParams.country = 'NL-Netherlands'
    ctrl = $controller('CountryDetailCtrl', {
      $scope: scope
    });
  }));

  // Check some defaults
  it('should have some default variables defined', function(){
    // Check if they are defined
    expect(ctrl.isLoading).toBeDefined();
    expect(ctrl.detail).toBeDefined()
    // Check if the default values are correct
    expect(ctrl.isLoading).toBeTruthy();
  });

  // Check errors while loading data from Service
  it('should be able to load the country data from a API', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond(404);
    // Update scope
    $rootScope.$digest();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // When the api gives an error the error message should be set
    expect(ctrl.error).toBeDefined();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));

  // Check if problems with data are handled correctly
  it('should check if the country is correctly retrieved from the API', inject(function($httpBackend, geonamesService, $rootScope){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond({
        geonames: ''
      });
    // Update scope
    $rootScope.$digest();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
    // Error should be set
    expect(ctrl.error).toBe('Error retrieving country');
  }));

  // Check if problems with capital data are handled correctly
  it('should check if the capital is correctly retrieved from the API', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve capital
    $httpBackend.whenJSONP('http://api.geonames.org//searchJSON?callback=JSON_CALLBACK&country=NL&isNameRequired=true&name_equals=Amsterdam&q=Amsterdam&username=danielsmink')
      .respond({
        geonames: ''
      });

    // Update scope
    $rootScope.$digest();
    // Mock timeout
    $timeout.flush();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
    // We should no longer be loading
    expect(ctrl.detail.capital.name).toBe('No capital');
    geonamesCache.remove();
  }));

  // Check if errors with capital data are handled correctly
  it('should check if 404 errors when capital is retrieved from the API are handled correctly', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve capital
    $httpBackend.whenJSONP('http://api.geonames.org//searchJSON?callback=JSON_CALLBACK&country=NL&isNameRequired=true&name_equals=Amsterdam&q=Amsterdam&username=danielsmink')
      .respond(404);

    // Update scope
    $rootScope.$digest();
    // Mock timeout
    $timeout.flush();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
    // The following error should be set
    expect(ctrl.error).toBe('Error retrieving capital info');
  }));

  // Check if errors with neighbour data are handled correctly
  it('should check if 404 errors when neighbours are retrieved from the API are handled correctly', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve capital
    $httpBackend.whenJSONP('http://api.geonames.org//searchJSON?callback=JSON_CALLBACK&country=NL&isNameRequired=true&name_equals=Amsterdam&q=Amsterdam&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve neighbours
    $httpBackend.whenJSONP('http://api.geonames.org//neighboursJSON?callback=JSON_CALLBACK&username=danielsmink')
      .respond(404);
    // Update scope
    $rootScope.$digest();
    // Mock timeout
    $timeout.flush();
    expect(ctrl.isLoading).toBeFalsy();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
    // The following error should be set
    expect(ctrl.error).toBe('Error retrieving neighbours');
  }));

  // Check loading data correctly from Service
  it('should be able to load the country data from a API', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&country=NL&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve capital
    $httpBackend.whenJSONP('http://api.geonames.org//searchJSON?callback=JSON_CALLBACK&country=NL&isNameRequired=true&name_equals=Amsterdam&q=Amsterdam&username=danielsmink')
      .respond({
        geonames: [ {
          capital: 'Amsterdam'
        }]
      });
    // Act on JSONP request to retrieve neighbours
    $httpBackend.whenJSONP('http://api.geonames.org//neighboursJSON?callback=JSON_CALLBACK&username=danielsmink')
      .respond({
        geonames: [ {
          neighbour: 'Belgium'
        }]
      });
    // Update scope
    $rootScope.$digest();
    // Mock timeout
    $timeout.flush();
    expect(ctrl.isLoading).toBeFalsy();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
    // We should no longer be loading
    expect(ctrl.detail).toBeDefined();
  }));

  // Cache should be removed
  it('should be able to remove cache when needed', function(){
    geonamesCache.put('NL');
    ctrl.cache = true;

    // Right now it should be true due to the previous test
    expect(geonamesCache.get('NL')).toBeTruthy();

    // Remove cache and check again it should now be false
    geonamesCache.remove('NL');
    expect(geonamesCache.get('NL')).toBeFalsy();
  });

  // Check loading data from cache
  it('should be able to load the data from cache after putting it in there', inject(function($rootScope){
    // Cache should be defined
    expect(ctrl.cache).toBeFalsy();

    // Before putting cache in it should be false
    expect(geonamesCache.get('countries')).toBeFalsy();

    // Put cache in afterwards it should be true
    geonamesCache.put('countries');
    expect(geonamesCache.get('countries')).toBeTruthy();
  }));

  // Cache set to true this means a few other variables should now be set
  it('should have data in detail and no longer be loading', function(){
    // Set cache
    geonamesCache.put('NL');
    ctrl.cache = geonamesCache.get('NL');

    // Check if cache is true
    expect(ctrl.cache).toBeTruthy();

    // Check if they are defined
    expect(ctrl.isLoading).toBeDefined();
    expect(ctrl.detail).toBeDefined();

    // Check if we are no longer loading data
    expect(ctrl.isLoading).toBeFalsy();
  });
});