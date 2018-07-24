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
            templateUrl: 'views/home.html',
            controller: 'LoginController',
          }
        }
      })
      .state('editor.home', {
        url: '',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
          }
        }
      })
      .state('editor.home.books', {
        url: '/books',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/items-list.html',
            controller: 'BooksController',
            resolve: {
              books: (Api) => {
                return Api.getBooks()
                  .tap((books) => {
                    return Promise.map(books, (book) => {
                      return Promise.map(book.chapters, (chapter) => {
                        const [org, repo] = chapter.split('/');
                        return Api.getTopic({ org, repo });
                      })
                      .then((chapters) => book.chapters = chapters);
                    })
                  });
              },
            }
          }
        }
      })
      .state('editor.home.books.new', {
        url: '/new',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/books/book-detail.html',
            controller: 'NewBookController',
            resolve: {
              guides: (Api) => {
                return Api.getAllGuides();
              },
              topics: (Api) => {
                return Api.getAllTopics();
              },
              book: (Book) => {
                return Book.from({});
              },
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
              guides: (Api) => {
                return Api.getAllGuides();
              },
              topics: (Api) => {
                return Api.getAllTopics();
              },
              book: (Api, CurrentItem, $stateParams) => {
                return Api.getBook($stateParams)
                  .tap((book) => CurrentItem.set(book))
                  .tap((book) => {
                    return Promise.map(book.chapters, (chapter) => {
                        const [org, repo] = chapter.split('/');
                        return Api.getTopic({ org, repo }).tap((topic) => {
                            return Api
                              .renderMarkdown(topic.description.split('\n')[0].trim())
                              .then((html) => topic.description = html);
                        });
                    })
                    .then((chapters) => book.chapters = chapters);
                  });
              }
            }
          }
        }
      })
      .state('editor.home.topics', {
        url: '/topics',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/items-list.html',
            controller: 'TopicsController',
            resolve: {
              topics: (Api) => {
                return Api.getTopics();
              }
            }
          }
        }
      })
      .state('editor.home.topics.new', {
        url: '/new',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/topics/topic-detail.html',
            controller: 'NewTopicController',
            resolve: {
              guides: (Api) => {
                return Api.getAllGuides();
              },
              topic: (Topic) => {
                return Topic.from({});
              }
            }
          }
        }
      })
      .state('editor.home.topics.detail', {
        url: '/:org/:repo',
        authenticated: true,
        views: {
          'content@editor': {
            templateUrl: 'views/content/topics/topic-detail.html',
            controller: 'TopicDetailController',
            resolve: {
              guides: (Api) => {
                return Api.getAllGuides();
              },
              topic: (Api, CurrentItem, $stateParams) => {
                return Api.getTopic($stateParams)
                  .tap((topic) => CurrentItem.set(topic))
                  .tap((topic) => {
                    return Promise.map(topic.lessons, (lesson) => {
                      const [org, repo] = lesson.split('/');
                      return Api.getGuide({ org, repo });
                    })
                    .then((lessons) => topic.lessons = lessons);
                  });
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
            templateUrl: 'views/content/items-list.html',
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
            templateUrl: 'views/content/guides/new-guide-detail.html',
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
              guide: (Api, CurrentItem, $stateParams) => {
                return Api.getGuide($stateParams)
                          .tap((guide) => CurrentItem.set(guide));
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
              exercise: (CurrentItem, $stateParams, Validator, $state) => {
                return Promise
                  .resolve(CurrentItem)
                  .call('get')
                  .call('getExercise', $stateParams.eid)
                  .tap((exercise) => Validator.notEmptyString(exercise, 'id'))
                  .catch(() => $state.go('editor.home.guides.detail', $stateParams));
              }
            }
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
