angular
  .module('editor')
  .controller('HomeController', function ($scope,
                                          $state,
                                          Book,
                                          Guide,
                                          Topic) {

    $scope.states = [
      {
        name: 'books',
        icon: Book.canonicalIcon(),
        click: () => $state.go('editor.home.books'),
      },
      {
        name: 'topics',
        icon: Topic.canonicalIcon(),
        click: () => $state.go('editor.home.topics'),
      },
      {
        name: 'guides',
        icon: Guide.canonicalIcon(),
        click: () => $state.go('editor.home.guides'),
      }
    ];

    $scope.click = (state) => state.click();

  });
