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

    $scope.save = Debounce.for(() => {
      return Promise
        .resolve(guide)
        .call('toSave')
        .then((guideToSave) => Api.saveGuide(guideToSave))
        .catch((error) => console.log(error.message));
    });

    Hotkeys.bindSave($scope);

  });
