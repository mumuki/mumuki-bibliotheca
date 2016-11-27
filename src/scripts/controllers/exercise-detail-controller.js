angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    GuideSaver,
                                                    Hotkeys,
                                                    Languages,
                                                    Editor) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;
    $scope.languages = Languages;

    $scope.Editor = Editor;

    $scope.save = () => GuideSaver.save($scope.guide);

    Hotkeys.bindSave($scope);

  });
