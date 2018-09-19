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

    exercise.initializeEditor();

    $scope.exercise = exercise;

    $scope.getItem = () => $scope.item.getItem();

    $scope.addExercise = () => GuideSaver.addExercise($scope.item);

    $scope.guideTags = _.uniq(_.flatten($scope.getItem().exercises.map(e => e.tag_list)));

    $scope.moveExerciseTo = function (index, exercise) {
      $scope.item.moveExerciseTo(index, exercise);
      return true;
    };

    $scope.save = () => {
      return $scope.publish('guide', (item) => {
        $scope.item = item;
        $scope.exercise = item.getExercise($scope.exercise.id);
      });
    }

  });
