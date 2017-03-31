angular
  .module('editor')
  .controller('GuideDetailController', function ($scope,
                                                 $filter,
                                                 $controller,
                                                 guide,
                                                 CurrentItem,
                                                 GuideSaver) {

    $controller('DetailController', {
      $scope: $scope,
      item: CurrentItem.get()
    });

    $scope.addExercise = () => GuideSaver.addExercise($scope.item);

    $scope.moveExerciseTo = function (index, exercise) {
      $scope.item.moveExerciseTo(index, exercise);
      return true;
    };

    $scope.save = () => {
      return $scope.publish('guide', (item) => {
        $scope.item = item;
      });
    }

  });
