angular
  .module('editor')
  .directive('randomizations', function ($filter,
                                          $timeout,
                                          Foldable) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/randomizations.html',
      scope: Foldable.scope({
        exercise: '=',
      }),
      controller: ($scope) => {

        Foldable.from($scope);

        _.defaults($scope.exercise, {randomizations: {}});

        const translate = $filter('translate');

        const RULES = [
          { key: 'one_of', defaultValue: [] },
          { key: 'range',  defaultValue: [] }
        ];

        const toRule = (ar) => {
          const [replace, replacer] = ar;
          const key = replacer.type;
          const type = _.find(RULES, {key});
          const value = replacer.value;
          return {
            selected: { replace, type, value },
          }
        };

        const fromRule = (rule) => {
          const randomization = {
            [rule.selected.replace]: {
              type: rule.selected.type.key,
              value: rule.selected.value
            }
          };
          return randomization;
        };

        $scope.rules = _.toPairs($scope.exercise.randomizations).map(toRule);

        $scope.supportedRules = RULES;

        $scope.isOneOf = (rule) => {
          return rule.type.key === 'one_of';
        };

        $scope.isRange = (rule) => {
          return rule.type.key === 'range';
        };

        $scope.addRule = () => {
          $scope.rules.push({ selected: { replace: '', type: RULES[0], value: _.clone(RULES[0].defaultValue) }});
        };

        $scope.addTest = (rule) => {
          rule.selected.value.push('');
        };

        $scope.removeRule = (rule) => {
          _.remove($scope.rules, rule);
        };

        $scope.removeTest = (selected, index) => {
          selected.value.splice(index, 1);
        };

        $scope.initRule = (rule) => {
          rule.value = _.clone(rule.type.defaultValue);
        };

        $scope.$watch('rules', () => {
          $scope.exercise.randomizations = _.transform($scope.rules.map(fromRule), _.merge, {});
        }, true);

      }

    }

  });
