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
          { key: 'content_empty',                   defaultValue: null,  needsValue: false },
          { key: 'submission_errored',              defaultValue: null,  needsValue: false },
          { key: 'submission_failed',               defaultValue: null,  needsValue: false },
          { key: 'submission_passed_with_warnings', defaultValue: null,  needsValue: false },

          { key: 'error_contains',                  defaultValue: '',    needsValue: true },

          { key: 'these_tests_failed',              defaultValue: [],    needsValue: true },
          { key: 'only_these_tests_failed',         defaultValue: [],    needsValue: true },
          { key: 'these_expectations_failed',       defaultValue: [],    needsValue: true },
        ]

        const getPairKeyValueFrom = (when) => {
          return typeof when == 'string' ? [when, null] : [_.keys(when)[0], _.values(when)[0]];
        }

        const toRule = (ar) => {
          const [key, value] = getPairKeyValueFrom(ar.when);
          const type = _.find(RULES, {key});
          const then = ar.then;
          return {
            selected: { type, then, value },
          }
        }

        const fromRule = (rule) => {
          const assistanceRule = {
            when: rule.selected.type.needsValue ? { [rule.selected.type.key]: rule.selected.value } : rule.selected.type.key,
            then: rule.selected.then,
          }
          return assistanceRule;
        }

        $scope.rules = $scope.exercise.assistance_rules.map(toRule);

        $scope.supportedRules = RULES;

        $scope.isObjectValue = (value) => {
          return value.type.needsValue && _.isString(value.value);
        }

        $scope.isArrayValue = (value) => {
          return value.type.needsValue && _.isArray(value.value);
        }

        $scope.isExpectationRule = (value) => {
          return value.type.key === 'these_expectations_failed';
        }

        $scope.humanExpectations = () => {
          return $scope.exercise.expectations.map((expectation) => expectation.binding.trim() + ' ' + expectation.inspection.trim());
        }

        $scope.addRule = () => {
          $scope.rules.push({ selected: { type: RULES[0], then: '', value: RULES[0].defaultValue } });
        };

        $scope.addTest = (rule) => {
          if (!$scope.isExpectationRule(rule.selected)) {
            rule.selected.value.push('');
          } else {
            rule.selected.value.push(_.first($scope.humanExpectations()));
          }
        };

        $scope.removeRule = (rule) => {
          _.remove($scope.rules, rule);
        }

        $scope.initRule = (rule) => {
          rule.value = _.clone(rule.type.defaultValue);
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
