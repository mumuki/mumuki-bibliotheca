angular
  .module('editor')
  .directive('assistanceRules', function ($filter,
                                          $timeout,
                                          Foldable) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/assistance-rules.html',
      scope: Foldable.scope({
        exercise: '=',
      }),
      controller: ($scope) => {

        Foldable.from($scope);

        _.defaults($scope.exercise, {assistance_rules: []});

        const translate = $filter('translate');

        const RULES = [
          { key: 'content_empty',                   value: null,  hasValue: false },
          { key: 'submission_errored',              value: null,  hasValue: false },
          { key: 'submission_failed',               value: null,  hasValue: false },
          { key: 'submission_passed_with_warnings', value: null,  hasValue: false },

          { key: 'error_contains',                  value: '',    hasValue: true },
          { key: 'these_tests_failed',              value: [],    hasValue: true },
          { key: 'only_these_tests_failed',         value: [],    hasValue: true },
          { key: 'these_expectations_failed',       value: [],    hasValue: true },
        ]

        const getPairKeyValueFrom = (when) => {
          return typeof when == 'string' ? [when, null] : [_.keys(when)[0], _.values(when)[0]];
        }

        const toRule = (ar) => {
          const [key, value] = getPairKeyValueFrom(ar.when);
          const hasValue = _.find(RULES, {key}).hasValue;
          const then = ar.then;
          return {
            selected: { key, value, hasValue, then },
          }
        }

        const fromRule = (rule) => {
          const assistanceRule = {
            when: rule.selected.hasValue ? { [rule.selected.key]: rule.selected.value } : rule.selected.key,
            then: rule.selected.then,
          }
          return assistanceRule;
        }

        $scope.rules = $scope.exercise.assistance_rules.map(toRule);

        $scope.supportedRules = RULES;

        $scope.addRule = () => {
          $scope.rules.push({ selected: _.clone(RULES[0]) });
        };

        $scope.removeRule = (rule) => {
          _.remove($scope.rules, rule);
        }

        $scope.$watch('rules', () => {
          $scope.exercise.assistance_rules = $scope.rules.map(fromRule);
          console.log($scope.rules, $scope.exercise.assistance_rules);
        }, true);

      }

    }

  })
