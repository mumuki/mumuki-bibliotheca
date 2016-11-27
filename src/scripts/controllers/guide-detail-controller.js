angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Hotkeys,
                                                GuideSaver,
                                                Locales,
                                                Languages) {

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

    $scope.save = () => GuideSaver.save($scope.guide);

    Hotkeys.bindSave($scope);

  });
