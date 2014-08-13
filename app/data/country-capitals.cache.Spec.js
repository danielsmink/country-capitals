'use strict';

/*
 * Contains a unittest for the cachefactory
 */

describe('Cachefactory: geonamesCache', function() {

  // load the controller's module
  beforeEach(module('countryCapitals'));

  it('should be sure name is defined', inject(function(geonamesCache){
    // Attempt to get cache
    geonamesCache.get('countries');
    // Check if name is defined
    expect(name).toBeDefined();
  }));

});
