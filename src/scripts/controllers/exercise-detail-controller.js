angular
  .module('editor')
  .controller('ExerciseDetailController', function ($scope,
                                                    exercise,
                                                    Hotkeys,
                                                    Api,
                                                    Languages,
                                                    Debounce,
                                                    Editor) {

    $scope.guide = exercise.guide();
    $scope.exercise = exercise;
    $scope.languages = Languages;

    $scope.Editor = Editor;

    $scope.save = Debounce.for(() => Api.saveGuide($scope.guide.toSave()));

    Hotkeys.bindSave($scope);

  });
