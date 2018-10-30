angular
  .module('editor')
  .directive('language', function (Languages) {

    return {
      restrict: 'E',
      templateUrl: 'views/directives/components/language.html',
      scope: {
        item: '=',
      },
      controller: ($scope) => {
        $scope.languages = Languages;
      }
    }
  });
