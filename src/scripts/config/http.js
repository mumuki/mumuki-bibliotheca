angular
  .module('editor')
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = false;
  });
