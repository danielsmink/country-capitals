'use strict';

/*
 * Countries controller unit test
 */

describe('Controller: CountriesCtrl', function() {

  var geonamesCache;

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
      cache = false,
      $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$location_){
    $location = _$location_;
    scope = $rootScope.$new();
    cache = geonamesCache.get();
    ctrl = $controller('CountriesCtrl', {
      $scope: scope,
      cache: cache
    });
  }));

  // Check some defaults
  it('should have some default variables defined', function(){
    // Check if they are defined
    expect(ctrl.isLoading).toBeDefined();
    expect(ctrl.ordering).toBeDefined();
    expect(ctrl.go).toBeDefined();

    // Check if the default values are correct
    expect(ctrl.isLoading).toBeTruthy();
    expect(ctrl.ordering).toEqual('countryName');
  });

  // Check go function
  it('should have a go function that lets the user browse to a country detail page', function(){
    // Check if function exsists
    expect(ctrl.go).toBeDefined();

    // Execute go function
    ctrl.go('/path');

    // The path should now be changed by the go function
    expect($location.path()).toBe('/path');
  });

  // Check errors while loading data from Service
  it('should be able to load the country data from a API', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&username=danielsmink')
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

  // Check loading data from Service
  it('should be able to load the country data from a API', inject(function($httpBackend, geonamesService, $rootScope, $timeout){
    // Act on JSONP request
    $httpBackend.whenJSONP('http://api.geonames.org//countryInfoJSON?callback=JSON_CALLBACK&username=danielsmink')
      .respond({
        geonames: {
          geonames: 'data'
        }
      });
    // Update scope
    $rootScope.$digest();
    // Mock timeout
    $timeout.flush()
    expect(ctrl.isLoading).toBeFalsy();
    // Ensure http mock code is applied
    $httpBackend.flush();
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));

  // Cache should be removed
  it('should be able to remove cache when needed', function(){
    // Cache should be defined
    expect(cache).toBeDefined();

    // Right now it should be true due to the previous test
    expect(geonamesCache.get('countries')).toBeTruthy();

    // Remove cache and check again it should now be false
    geonamesCache.remove('countries');
    expect(geonamesCache.get('countries')).toBeFalsy();
  });

  // Check loading data from cache
  it('should be able to load the data from cache after putting it in there', inject(function($rootScope){
    // Cache should be defined
    expect(cache).toBeDefined();

    // Before putting cache in it should be false
    expect(geonamesCache.get('countries')).toBeFalsy();

    // Put cache in afterwards it should be true
    geonamesCache.put('countries');
    expect(geonamesCache.get('countries')).toBeTruthy();
  }));

  // Cache has been set to true in the previous test this means a few other variables should now be set
  it('should have data in geonames and now longer be loading', function(){
    // Check if they are defined
    expect(ctrl.isLoading).toBeDefined();
    expect(ctrl.geonames).toBeDefined();

    // Check if we are no longer loading data
    expect(ctrl.isLoading).toBeFalsy();
  });
});