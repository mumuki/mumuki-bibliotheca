angular
  .module('editor')
  .directive('aceEvaluation', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-evaluation.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        const firstTabVisible = () => _.find($scope.tabs, (t) => t.isVisible());

        $scope.tabs = [
          {
            name: 'choices',
            templateUrl: 'views/directives/evaluation/choices.html',
            isVisible: () => $scope.exercise.needsChoices(),
          },
          {
            name: 'test',
            templateUrl: 'views/directives/evaluation/test.html',
            isVisible: () => $scope.exercise.needsTests(),
          },
          {
            name: 'goal',
            templateUrl: 'views/directives/evaluation/goal.html',
            isVisible: () => $scope.exercise.needsGoal(),
          },
          {
            name: 'inspections',
            templateUrl: 'views/directives/evaluation/expectations.html',
            isVisible: () => $scope.exercise.needsExpectations(),
          },
          {
            name: 'extra',
            templateUrl: 'views/directives/evaluation/extra.html',
            isVisible: () => $scope.exercise.needsExtra(),
            shouldRenderFirst: $scope.exercise.usesCustomEditor()
          },
          {
            name: 'default_content',
            templateUrl: 'views/directives/evaluation/default_content.html',
            isVisible: () => $scope.exercise.needsDefaultContent(),
          },
          {
            name: 'solution',
            templateUrl: 'views/directives/evaluation/solution.html',
            isVisible: () => $scope.exercise.needsSolution(),
          },
        ];

        const defaultMode = () => ({ mode: $scope.exercise.usesCustomEditor() ? 'custom' : 'interpolation' });
        $scope.extraEditor = defaultMode();
        $scope.contentEditor = defaultMode();

        $scope.selectTab = (tab) => {
          $scope.tabs.forEach((t) => t.selected = false);
          tab.selected = true;
        }

        $scope.selectTab(firstTabVisible());
        const firstTab = $scope.tabs.find((it) => it.shouldRenderFirst);
        if (firstTab) { setTimeout(() => $scope.selectTab(firstTab)); }

        $scope.$watch(() => $scope.exercise.getType(), () => $scope.selectTab(firstTabVisible()));
        $scope.$watch(() => $scope.exercise.getEditor(), () => $scope.selectTab(firstTabVisible()));
        $scope.$watch(() => $scope.exercise.getLanguage(), () => $scope.selectTab(firstTabVisible()));

        $scope.addChoice = () => {
          $scope.exercise.choices = $scope.exercise.choices || [];
          $scope.exercise.choices.push({ value: '', checked: false });
        }

        $scope.removeChoice = (choice) => {
          _.remove($scope.exercise.choices, choice);
        }

        $scope.someIsVisible = () => {
          return _.some($scope.tabs, (t) => t.isVisible());
        }

        $scope.goals = [
          {
            kind: 'last_query_equals',
            value: ''
          },
          {
            kind: 'last_query_matches',
            regexp: ''
          },
          {
            kind: 'last_query_passes',
          },
          {
            kind: 'last_query_fails',
          },
          {
            kind: 'last_query_outputs',
            output: ''
          },
          {
            kind: 'last_query_output_includes',
            output: ''
          },
          {
            kind: 'last_query_output_like',
            output: ''
          },
          {
            kind: 'query_passes',
            query: ''
          },
          {
            kind: 'query_fails',
            query: ''
          },
          {
            kind: 'query_outputs',
            query: '',
            output: ''
          }
        ]

        let isTestUI = $scope.exercise.isGobstonesLanguage() && $scope.exercise.isKidsLayout();

        $scope.isTestUI = () => {
          return isTestUI;
        }

        $scope.enableTestUI = () => {
          isTestUI = true;
        }

        $scope.disableTestUI = () => {
          isTestUI = false;
        }

        $scope.isEnabledTestUI = () => {
          return $scope.exercise.isGobstonesLanguage() && $scope.isTestUI();
        }

        $scope.has = (field) => {
           return _.chain($scope)
            .get('exercise.goal', {})
            .has(field)
            .value();
        };

      }

    }

  })
