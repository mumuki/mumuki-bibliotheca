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
      return $scope
        ._save()
        .tap((item) => $state.go('editor.home.books.detail', item.params()))
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    };


  });
