angular
  .module('editor')
  .directive('locale', function (Locales) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/locale.html',
      scope: {
        item: '=',
      },
      controller: ($scope) => {

        $scope.locales = Locales;

        $scope.currentLocaleIcon = (locale) => Locales.fromCode(locale).icon();

      }

    }

  })


