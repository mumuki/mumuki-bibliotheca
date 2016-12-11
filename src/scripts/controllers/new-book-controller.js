angular
  .module('editor')
  .controller('NewBookController', function($scope,
                                            $state,
                                            $controller,
                                            book,
                                            topics,
                                            guides,
                                            toastr,
                                            CurrentItem) {

    CurrentItem.set(book);

    $controller('BookDetailController', {
      $scope: $scope,
      book: CurrentItem.get(),
      topics: topics,
      guides: guides,
    });

    $scope.isNew = true;

    $scope.save = () => {
      return $scope.publish('book', (item) => {
        $state.go('editor.home.books.detail', item.params());
      });
    };

  });
