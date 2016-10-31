angular
  .module('editor')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('editor', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'views/layout.html',
          },
          'navbar@editor': {
            templateUrl: 'views/navbar/navbar.html',
            controller: 'NavbarController'
          }
        }
      });

    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('editor', {}, { reload: true, location: 'replace' });
    });

  });
