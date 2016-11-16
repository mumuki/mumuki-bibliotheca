angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    Languages) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;
    $scope.languages = Languages;

  });
