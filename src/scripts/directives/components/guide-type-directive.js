angular
  .module('editor')
  .directive('guideType', function (GuideTypes) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/guide-type.html',
      scope: {
        guide: '=',
      },
      controller: ($scope) => {

        $scope.guideTypes = GuideTypes;

      }

    }

  })


