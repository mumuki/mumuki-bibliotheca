angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                toastr,
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
        .catch((error) => toastr.error(`${error.message}`));
    });

    Hotkeys.bindSave($scope);

  });
