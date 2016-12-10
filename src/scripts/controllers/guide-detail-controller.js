angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                $filter,
                                                $controller,
                                                guide,
                                                GuideSaver) {

    $controller('DetailController', {
      $scope: $scope,
      item: guide
    });

    $scope.addExercise = () => GuideSaver.addExercise($scope.item);

    $scope.save = () => {
      return GuideSaver.save($scope.item, (guide) => {
        $scope.item = guide;
      });
    }

  });
