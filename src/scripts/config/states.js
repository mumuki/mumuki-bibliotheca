angular
  .module('editor')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('editor', {
        abstract: false,
        views: {
          '@': {
            templateUrl: 'views/layout.html',
            resolve: {
              languages: (Api, Languages) => {
                Api.getLanguages().then(Languages.set);
              }
            }
          },
          'navbar@editor': {
            templateUrl: 'views/navbar/navbar.html',
            controller: 'NavbarController'
          },
          'footer@editor': {
            templateUrl: 'views/footer/footer.html'
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
        abstract: true,
        authenticated: true
      })
      .state('editor.home.guides', {
        url: '/guides',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/guides/guides.html',
            controller: 'GuidesController',
            resolve: {
              guides: (Api) => {
                return Api.getGuides();
              }
            }
          }
        }
      })
      .state('editor.home.guides.detail', {
        url: '/:org/:repo',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/guides/guide-detail.html',
            controller: 'GuideDetailController',
            resolve: {
              guide: (Api, $stateParams) => {
                return Api.getGuide($stateParams);
              }
            }
          }
        }
      });
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('editor.home.guides', {}, { reload: true, location: 'replace' });
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
        $state.go('editor.home.guides', {}, { location: 'replace' });
        ev.preventDefault();
      }

    });

  });
