angular
  .module('editor')
  .controller('BooksController', function ($scope,
                                           $state,
                                           books,
                                           Book,
                                           Modal,
                                           $filter,
                                           toastr,
                                           Api) {
    const translate = $filter("translate");

    $scope.list = books;
    $scope.Model = Book;
    $scope.newState = 'editor.home.books.new';
    $scope.isBooks = true;

    $scope.open = (book) => {
      $state.go('editor.home.books.detail', book.params());
    };

    $scope.delete = (book) => {
      Modal.confirmYesNo('Mumuki', translate("delete_confirm", { "fullName": book.fullName() }), () => {
        return Api
          .deleteBook(book.params())
          .then(() => {
            _.remove($scope.list, book);
            toastr.success(translate('delete_success', { fullName: book.fullName() }));
          })
          .catch((ex) => {
            console.error("Error while deleting item.", ex, book);
            toastr.error("Error: " + ex.message);
          });
      });
    }
  });
