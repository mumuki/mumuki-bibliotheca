angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            $state,
                                            $stateParams,
                                            guides,
                                            Guide) {

    $scope.list = guides;
    $scope.Model = Guide;

    $scope.open = (guide) => {
      $state.go('editor.home.guides.detail', guide.params());
    }

  });
