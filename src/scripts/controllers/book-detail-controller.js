angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                book,
                                                Hotkeys) {

    $scope.book = book;

    $scope.save = () => $scope.book;

    Hotkeys.bindSave($scope);

  });
