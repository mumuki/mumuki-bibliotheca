angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Hotkeys,
                                                GuideTypes,
                                                GuideSaver,
                                                Locales,
                                                Languages) {

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;
    $scope.guideTypes = GuideTypes;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

    $scope.save = () => GuideSaver.save($scope.guide);

    $scope.addExercise = () => GuideSaver.addExercise($scope.guide);

    Hotkeys.bindSave($scope);

  });
