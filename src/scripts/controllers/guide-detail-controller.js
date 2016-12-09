angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                $filter,
                                                guide,
                                                Hotkeys,
                                                GuideSaver,
                                                LeaveItem) {

    $scope.guide = guide;

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    $scope.save = () => {
      return GuideSaver.save($scope.guide, (guide) => {
        $scope.guide = guide;
      });
    }

    Hotkeys.bindSave($scope);

    LeaveItem.bindTo($scope, $scope.guide);

  });
