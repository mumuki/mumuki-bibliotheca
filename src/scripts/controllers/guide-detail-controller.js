angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Hotkeys,
                                                GuideSaver) {

    $scope.guide = guide;

    $scope.save = () => GuideSaver.save($scope.guide);

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    Hotkeys.bindSave($scope);

  });
