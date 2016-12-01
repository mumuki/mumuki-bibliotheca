angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $sce,
                                                book,
                                                Api,
                                                Hotkeys) {

    $scope.book = book;

    $scope.save = () => Api.saveBook($scope.book.toSave());
    $scope.html = (html) => $sce.trustAsHtml(html);

    Hotkeys.bindSave($scope);

  });
