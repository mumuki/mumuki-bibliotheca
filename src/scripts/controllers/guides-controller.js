angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            guides,
                                            Guide) {

    $scope.list = guides;
    $scope.Model = Guide;

  });
