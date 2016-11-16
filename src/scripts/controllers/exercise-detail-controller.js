angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    CurrentGuide) {

    $scope.guide = CurrentGuide.get();
    $scope.exercise = exercise;

  });
