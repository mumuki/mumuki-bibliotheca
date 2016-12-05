angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            $state,
                                            $stateParams,
                                            guides,
                                            Guide) {

    $scope.list = guides;
    $scope.Model = Guide;
    $scope.newState = 'editor.home.guides.new';

    $scope.open = (guide) => {
      $state.go('editor.home.guides.detail', guide.params());
    }

  });
