angular
  .module('editor')
  .directive('expectations', function (Inspections,
                                       Inspection) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/expectations.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        _.defaults($scope.exercise, {expectations: []});

        Inspections.get().then((expectations) => {
          $scope.smells = expectations.smells;
          $scope.expectations = expectations.expectations;
        });

        $scope.inspections = Inspections.fromArray($scope.exercise.expectations);

        $scope.addExpectation = () => {
          $scope.inspections.push(Inspection.fromSupportedExpectation(_.first($scope.expectations)));
        };

        $scope.addException = () => {
          $scope.inspections.push(Inspection.fromSupportedSmell(_.first($scope.smells)));
        };

        $scope.removeInspection = (inspection) => {
          _.remove($scope.inspections, inspection);
        };

        $scope.$watch('inspections', () => {
          $scope.exercise.expectations = $scope.inspections.map((inspection) => inspection.asBindingInspection());
        }, true);

      }

    }

  });
