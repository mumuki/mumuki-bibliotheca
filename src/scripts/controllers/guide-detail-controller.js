angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Hotkeys,
                                                Debounce,
                                                Locales,
                                                Languages,
                                                Api) {

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

    $scope.save = Debounce.for(() => Api.saveGuide(guide.toSave()));

    Hotkeys.bindSave($scope);

  });
