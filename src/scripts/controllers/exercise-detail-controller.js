angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    Languages,
                                                    Editor) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;
    $scope.languages = Languages;

    $scope.Editor = Editor;

  });
