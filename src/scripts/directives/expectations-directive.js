angular
  .module('editor')
  .directive('expectations', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/expectations.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        $scope.expectations = $scope.exercise.expectations

      }

    }

  })
