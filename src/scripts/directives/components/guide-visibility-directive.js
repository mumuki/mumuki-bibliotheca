angular
  .module('editor')
  .directive('guideVisibility', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/guide-visibility.html',
      scope: {
        guide: '='
      },
      controller: ($scope) => {
        $scope.visibilityTitle = () => $scope.guide.private ? 'private' : 'public';

        $scope.visibilityIcon = () => guideVisibilityIcon[$scope.visibilityTitle()];

        const guideVisibilityIcon = {
          'private': 'fa-lock',
          'public': 'fa-unlock'
        }
      }
    }

  });

