angular
  .module('editor')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('editor', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'views/layout.html',
          }
        }
      })

    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('editor', {}, { reload: true, location: 'replace' });
    });

  });
