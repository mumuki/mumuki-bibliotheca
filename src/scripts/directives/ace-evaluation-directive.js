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

        let _selectedTab;

        $scope.tabs = [
          {
            name: 'test',
            templateUrl: 'views/directives/evaluation/test.html',
          },
          {
            name: 'expectations',
            templateUrl: 'views/directives/evaluation/expectations.html',
          },
          {
            name: 'extra',
            templateUrl: 'views/directives/evaluation/extra.html',
          },
          {
            name: 'default_code',
            templateUrl: 'views/directives/evaluation/default_code.html',
          },
          {
            name: 'solution',
            templateUrl: 'views/directives/evaluation/solution.html',
          },
        ];

        $scope.selectTab = (tab) => {
          $scope.tabs.forEach((t) => t.selected = false);
          tab.selected = true;
          _selectedTab = tab;
        }

        $scope.isSelected = (name) => {
          return { "active": _selectedTab.name === name };
        }

        $scope.selectTab($scope.tabs[0]);

      }

    }

  })
