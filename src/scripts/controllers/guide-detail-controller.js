angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Auth,
                                                Hotkeys,
                                                GuideTypes,
                                                GuideSaver,
                                                Locales,
                                                CurrentGuide,
                                                Languages) {

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;
    $scope.guideTypes = GuideTypes;

    $scope.isSuperUser = Auth.isSuperUser();
    $scope.organizations = Auth.organizations();

    $scope.getOrganization = CurrentGuide.getOrganization;
    $scope.setOrganization = CurrentGuide.setOrganization;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

    $scope.save = () => GuideSaver.save($scope.guide);

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    Hotkeys.bindSave($scope);

  });
