angular
  .module('editor')
  .config(function ($httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(function($q) {
      return {
        'request': function(config) {
          //CORS doesn't allow using Allow-Origin: * with credentials.
          if(config.url.indexOf('.runners.mumuki.io/assets/') !== -1){
            config.withCredentials = false;
          }
          return config;
        }
      };
    });
  });
