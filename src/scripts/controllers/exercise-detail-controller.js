angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    GuideSaver,
                                                    Hotkeys,
                                                    Editor) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;

    $scope.Editor = Editor;

    $scope.save = () => GuideSaver.save($scope.guide);

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    Hotkeys.bindSave($scope);

  });
