angular
  .module('editor')
  .directive('solution', function (Modal, Api) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/solution.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        $scope.solution = {}

        const getSolution = (exercise) => ({
          test: exercise.test,
          extra: exercise.getExtraCode(),
          content: exercise.solution,
          expectations: exercise.expectations
        });

        $scope.submit = (exercise) => {
          Api
            .testSolution(exercise.guide().id, exercise.id, exercise.getLanguage(), getSolution(exercise))
            .then((data) => Modal.solutionResults(data))
        }

      }

    }

  })
