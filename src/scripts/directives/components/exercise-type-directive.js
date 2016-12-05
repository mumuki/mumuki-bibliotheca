angular
  .module('editor')
  .directive('exerciseType', function (ExerciseTypes) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/exercise-type.html',
      scope: {
        exercise: '=',
      },
      controller: ($scope) => {

        $scope.exerciseTypes = ExerciseTypes;

      }

    }

  })


