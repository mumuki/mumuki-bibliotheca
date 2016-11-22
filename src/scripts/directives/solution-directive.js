angular
  .module('editor')
  .directive('solution', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/solution.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        $scope.submit = () => {
          // TODO
        }

      }

    }

  })
