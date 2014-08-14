// Karma configuration
// Generated on Wed Aug 13 2014 13:39:00 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-animate.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-route.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular-mocks.js',
      'app/**/!(*Spec).js',
      'app/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/!(*Spec).js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
