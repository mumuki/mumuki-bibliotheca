angular
  .module('editor')
  .controller('HomeController', function ($scope, Book, Guide, Topic) {

    $scope.states = [
      { name: 'books', icon: Book.canonicalIcon() },
      { name: 'topics', icon: Topic.canonicalIcon() },
      { name: 'guides', icon: Guide.canonicalIcon() }
    ];

  });
