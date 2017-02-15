module.exports = function(config){
  config.set({


    basePath : '../',

    files : [
      '/static/bower_components/humanize-duration/humanize-duration.js',
      '/static/bower_components/moment/min/moment-with-locales.js',
      '/static/bower_components/angular/angular.js',
      '/static/bower_components/angular-mocks/angular-mocks.js',
      '/static/app/js/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      '/static/bower_components/angular-scenario/angular-scenario.js'
    ],

    autoWatch : false,

    browsers : ['Chrome'],

    frameworks: ['jasmine'],

    singleRun : true,

    proxies : {
      '/': 'http://localhost:3030/'
    },

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-scenario'
    ],

    junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }

  })
};
