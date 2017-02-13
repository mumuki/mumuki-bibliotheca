angular
  .module('editor')
  .config(function ($cookiesProvider, CONFIG) {
    $cookiesProvider.defaults = { domain: CONFIG.cookie.domain, path: '/' };
  });
