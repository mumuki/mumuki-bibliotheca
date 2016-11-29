angular
  .module('editor')
  .controller('BooksController', function ($scope,
                                            books,
                                            Book) {

    $scope.list = books;
    $scope.Model = Book;

    $scope.open = (book) => {}

  });
