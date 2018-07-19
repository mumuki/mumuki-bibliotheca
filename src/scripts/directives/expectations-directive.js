angular
  .module('editor')
  .directive('expectations', function (Inspections) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/expectations.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        _.defaults($scope.exercise, {expectations: []});

        const emptyExpectation = () => {
          const inspection = {
            verb: _.first($scope.expectations),
            scope: '',
            target: '',
            isSmell: false,
            needsArgument: () => _.endsWith(inspection.verb, ':'),
            asInspection: () => `${inspection.verb}${inspection.needsArgument() ? inspection.target : ''}`
          }
          return inspection;
        }

        const emptySmell = () => {
          const inspection = {
            verb: _.first($scope.smells),
            scope: '*',
            isSmell: true,
            needsArgument: () => false,
            asInspection: () => `Except:${inspection.verb}`
          }
          return inspection;
        }

        $scope.inspections = $scope.exercise.expectations.map(({binding, inspection}) => {
          const [verb, target] = _(inspection).split(/^(Not:.*:|Except:.*|.*:)/).compact().value();
          const isSmell = _(verb).startsWith('Except:');
          const newInspection = isSmell ? emptySmell() : emptyExpectation();
          newInspection.verb = verb.replace(/^Except:/, '');
          newInspection.scope = binding;
          newInspection.target = target;
          newInspection.isSmell = isSmell;
          return newInspection;
        });

        $scope.addExpectation = () => {
          $scope.inspections.push(emptyExpectation());
        };

        $scope.addException = () => {
          $scope.inspections.push(emptySmell());
        };

        $scope.removeInspection = (inspection) => {
          _.remove($scope.inspections, inspection);
        }

        Inspections
          .get()
          .then((expectations) => {
            $scope.smells = expectations.smells;
            $scope.expectations = expectations.expectations;
          })

        $scope.$watch('inspections', () => {
          $scope.exercise.expectations = $scope.inspections.map((inspection) => {
            return {
              binding: inspection.scope,
              inspection: inspection.asInspection()
            }
          });
        }, true);

      }

    }

  });
