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
          { key: 'content_empty',                   value: null,  needsValue: false },
          { key: 'submission_errored',              value: null,  needsValue: false },
          { key: 'submission_failed',               value: null,  needsValue: false },
          { key: 'submission_passed_with_warnings', value: null,  needsValue: false },

          { key: 'error_contains',                  value: '',    needsValue: true },

          { key: 'these_tests_failed',              value: [],    needsValue: true },
          { key: 'only_these_tests_failed',         value: [],    needsValue: true },
          { key: 'these_expectations_failed',       value: [],    needsValue: true },
        ]

        const getPairKeyValueFrom = (when) => {
          return typeof when == 'string' ? [when, null] : [_.keys(when)[0], _.values(when)[0]];
        }

        const toRule = (ar) => {
          const [key, value] = getPairKeyValueFrom(ar.when);
          const supportedRule = _.find(RULES, {key});
          const needsValue = supportedRule.needsValue;
          const toValue = supportedRule.toValue;
          const fromValue = supportedRule.fromValue;
          const then = ar.then;
          return {
            selected: { key, needsValue, then, toValue, fromValue, value },
          }
        }

        const fromRule = (rule) => {
          const assistanceRule = {
            when: rule.selected.needsValue ? { [rule.selected.key]: rule.selected.value } : rule.selected.key,
            then: rule.selected.then,
          }
          return assistanceRule;
        }

        $scope.rules = $scope.exercise.assistance_rules.map(toRule);

        $scope.supportedRules = RULES;

        $scope.isObjectValue = (value) => {
          return value.needsValue && _.isString(value.value);
        }

        $scope.isArrayValue = (value) => {
          return value.needsValue && _.isArray(value.value);
        }

        $scope.addRule = () => {
          $scope.rules.push({ selected: _.clone(RULES[0]) });
        };

        $scope.addTest = (rule) => {
          rule.selected.value.push('');
        };

        $scope.removeRule = (rule) => {
          _.remove($scope.rules, rule);
        }

        $scope.removeTest = (selected, index) => {
          selected.value.splice(index, 1);
        }

        $scope.$watch('rules', () => {
          $scope.exercise.assistance_rules = $scope.rules.map(fromRule);
        }, true);

      }

    }

  })
