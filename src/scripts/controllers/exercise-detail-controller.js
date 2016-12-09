angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    GuideSaver,
                                                    Hotkeys,
                                                    LeaveItem) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    $scope.save = () => {
      return GuideSaver
        .save($scope.guide, (guide) => {
          $scope.guide = guide;
          $scope.exercise = guide.getExercise($scope.exercise.id);
        });
    }

    LeaveItem.bindTo($scope, $scope.guide);

    Hotkeys.bindSave($scope);

  });
