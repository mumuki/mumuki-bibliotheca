angular
  .module('editor')
  .controller('BooksController', function ($scope,
                                           $state,
                                           books,
                                           Book,
                                           Modal,
                                           $filter,
                                           $controller,
                                           toastr,
                                           Api) {
    $controller('HomeListController', {
      $scope, $state, Modal, $filter, toastr, list: books, model: Book,
      openStateId: 'editor.home.books.detail',
      deleteFunction: (book) => Api.deleteBook(book.params())
    });

    $scope.newState = 'editor.home.books.new';
    $scope.isBooks = true;

  });
