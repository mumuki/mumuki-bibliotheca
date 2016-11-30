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
      .state('editor.home.books', {
        url: '/books',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/books/books.html',
            controller: 'BooksController',
            resolve: {
              books: (Api) => {
                return Api.getBooks();
              }
            }
          }
        }
      })
      .state('editor.home.books.detail', {
        url: '/:org/:repo',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/books/book-detail.html',
            controller: 'BookDetailController',
            resolve: {
              book: (Api, $stateParams) => {
                return Api.getBook($stateParams);
              }
            }
          }
        }
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
      .state('editor.home.guides.new', {
        url: '/new',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/guides/guide-detail.html',
            controller: 'NewGuideController',
            resolve: {
              guide: (Guide) => {
                return Guide.from({});
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
              guide: (Api, CurrentGuide, $stateParams) => {
                return Api.getGuide($stateParams)
                          .tap((guide) => CurrentGuide.set(guide));
              }
            }
          }
        }
      })
      .state('editor.home.guides.detail.exercise', {
        url: '/exercises/:eid',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/guides/exercise-detail.html',
            controller: 'ExerciseDetailController',
            resolve: {
              exercise: (CurrentGuide, $stateParams) => {
                return CurrentGuide.get().getExercise($stateParams.eid);
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
