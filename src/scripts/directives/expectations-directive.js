angular
  .module('editor')
  .directive('expectations', function (Expectations) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/expectations.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        const emptyInspection = () => {
          const exp = {
            verb: '',
            scope: '',
            target: '',
            isSmell: false,
            needsArgument: () => _.endsWith(exp.verb, ':'),
            asInspection: () => `${exp.verb}${exp.needsArgument() ? exp.target : ''}`
          }
          return exp;
        }

        const emptySmell = () => {
          const exp = {
            verb: '',
            scope: '*',
            isSmell: true,
            needsArgument: () => false,
            asInspection: () => `${exp.verb}`
          }
          return exp;
        }

        $scope.full_expectations = $scope.exercise.expectations.map(({binding, inspection}) => {
          const [verb, target] = _(inspection).split(/^(Not:.*:|Except:.*|.*:)/).compact().value();
          const exp = emptyInspection();
          exp.verb = verb;
          exp.scope = binding;
          exp.target = target;
          exp.isSmell = _(verb).startsWith('Except:');
          return exp;
        });

        $scope.addInspection = () => {
          $scope.full_expectations.push(emptyInspection());
        };

        $scope.removeExpectation = (expectation) => {
          _.remove($scope.full_expectations, expectation);
        }

        Expectations
          .get()
          .then((expectations) => {
            $scope.smells = expectations.smells;
            $scope.inspections = expectations.inspections;
          })

        $scope.$watch('full_expectations', () => {
          $scope.exercise.expectations = $scope.full_expectations.map((expectation) => {
            return {
              binding: expectation.scope,
              inspection: expectation.asInspection()
            }
          });
        }, true);

      }

    }

  });
