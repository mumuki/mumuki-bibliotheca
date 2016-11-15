angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                Locales,
                                                Languages,
                                                CurrentGuide) {

    CurrentGuide.set(guide);

    $scope.guide = guide;

    $scope.locales = Locales;
    $scope.languages = Languages;

    $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

  });
