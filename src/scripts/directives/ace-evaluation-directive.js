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
            name: 'inspections',
            templateUrl: 'views/directives/evaluation/expectations.html',
            isVisible: () => $scope.exercise.needsExpectations(),
          },
          {
            name: 'extra',
            templateUrl: 'views/directives/evaluation/extra.html',
            isVisible: () => $scope.exercise.needsExtra(),
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

        $scope.selectTab = (tab) => {
          $scope.tabs.forEach((t) => t.selected = false);
          tab.selected = true;
        }

        $scope.selectTab(firstTabVisible());

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

      }

    }

  })
