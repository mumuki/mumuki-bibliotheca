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

        const SEP = ':<>:'

        const RULES = [
          { key: 'content_empty',                   value: null,  needsValue: false, toValue: (v) => v, fromValue: (v) => v },
          { key: 'submission_errored',              value: null,  needsValue: false, toValue: (v) => v, fromValue: (v) => v },
          { key: 'submission_failed',               value: null,  needsValue: false, toValue: (v) => v, fromValue: (v) => v },
          { key: 'submission_passed_with_warnings', value: null,  needsValue: false, toValue: (v) => v, fromValue: (v) => v },

          { key: 'error_contains',                  value: '',    needsValue: true, toValue: (v) => v,            fromValue: (v) => v },

          { key: 'these_tests_failed',              value: '',    needsValue: true, toValue: (v) => v.split(SEP), fromValue: (v) => v.join(SEP) },
          { key: 'only_these_tests_failed',         value: '',    needsValue: true, toValue: (v) => v.split(SEP), fromValue: (v) => v.join(SEP) },
          { key: 'these_expectations_failed',       value: '',    needsValue: true, toValue: (v) => v.split(SEP), fromValue: (v) => v.join(SEP) },
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
            selected: { key, needsValue, then, toValue, fromValue, value: fromValue(value) },
          }
        }

        const fromRule = (rule) => {
          const assistanceRule = {
            when: rule.selected.needsValue ? { [rule.selected.key]: rule.selected.toValue(rule.selected.value) } : rule.selected.key,
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
        }, true);

      }

    }

  })
