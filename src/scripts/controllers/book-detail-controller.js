angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $sce,
                                                book,
                                                Hotkeys) {

    $scope.book = book;

    $scope.save = () => $scope.book;
    $scope.html = (html) => $sce.trustAsHtml(html);

    Hotkeys.bindSave($scope);

  });
