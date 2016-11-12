angular
  .module('editor')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('editor', {
        abstract: false,
        views: {
          '@': {
            templateUrl: 'views/layout.html',
          },
          'navbar@editor': {
            templateUrl: 'views/navbar/navbar.html',
            controller: 'NavbarController'
          }
        }
      })
      .state('editor.login', {
        url: '/login',
        authenticated: false,
        views: {
          'content@editor': {
            template: 'NOT Authenticated',
          }
        }
      })
      .state('editor.home', {
        url: '/home',
        authenticated: true,
        views: {
          'content@editor': {
            template: 'Authenticated',
          }
        }
      });

    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('editor.home', {}, { reload: true, location: 'replace' });
    });

  })
  .run(($rootScope, $state, Auth) => {

    $rootScope.$on('$stateChangeStart', (ev, toState) => {

      Auth.authenticateIfPossible();

      if(toState.authenticated && !Auth.isLoggedIn()) {
        $state.go('editor.login', {}, { location: 'replace' });
        ev.preventDefault();
      }

      if(toState.name === 'editor.login' && Auth.isLoggedIn()) {
        $state.go('editor.home', {}, { location: 'replace' });
        ev.preventDefault();
      }

    });

  });
