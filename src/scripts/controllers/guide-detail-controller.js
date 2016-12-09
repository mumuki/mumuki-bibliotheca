angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Hotkeys,
                                                GuideSaver) {

    $scope.guide = guide;

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    $scope.save = () => {
      return GuideSaver
        .save($scope.guide)
        .tap((guide) => $scope.guide = guide);
    }

    Hotkeys.bindSave($scope);

  });
