angular
  .module('editor')
  .directive('solution', function (Api) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/solution.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        $scope.solution = {}

        $scope.submit = (exercise) => {
          Api
            .testSolution(exercise.guide().id, exercise.id)
            .then((data) => $scope.solution = data)
            .then(() => $scope.$apply())
        }

      }

    }

  })
