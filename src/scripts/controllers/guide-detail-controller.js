angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Auth,
                                                Hotkeys,
                                                GuideTypes,
                                                GuideSaver,
                                                CurrentItem,
                                                Languages) {

    $scope.guide = guide;

    $scope.languages = Languages;
    $scope.guideTypes = GuideTypes;

    $scope.isSuperUser = Auth.isSuperUser();
    $scope.organizations = Auth.organizations();

    $scope.getOrganization = CurrentItem.getOrganization;
    $scope.setOrganization = CurrentItem.setOrganization;

    $scope.save = () => GuideSaver.save($scope.guide);

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    Hotkeys.bindSave($scope);

  });
