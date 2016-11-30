angular
  .module('editor')
  .controller('BooksController', function($scope,
                                          $state,
                                          books,
                                          Book) {

    $scope.list = books;
    $scope.Model = Book;

    $scope.open = (book) => {
      $state.go('editor.home.books.detail', book.params());
    }

  });
