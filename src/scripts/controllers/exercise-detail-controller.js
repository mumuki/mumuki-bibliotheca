angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    $controller,
                                                    exercise,
                                                    GuideSaver) {

    $controller('DetailController', {
      $scope: $scope,
      item: exercise.guide()
    });

    $scope.exercise = exercise;

    $scope.getItem = () => $scope.item.getItem();

    $scope.addExercise = () => GuideSaver.addExercise($scope.item);

    $scope.save = () => {
      return GuideSaver
        .save($scope.item, (item) => {
          $scope.item = item;
          $scope.exercise = item.getExercise($scope.exercise.id);
        });
    }

  });
