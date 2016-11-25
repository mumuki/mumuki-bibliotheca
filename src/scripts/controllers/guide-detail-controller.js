angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Locales,
                                                Languages,
                                                Api) {

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

    $scope.save = () => Api.saveGuide(guide.toSave());

  });
