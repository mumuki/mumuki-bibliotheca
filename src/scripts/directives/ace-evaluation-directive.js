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

        $scope.tabs = [
          { name: 'test', selected: true },
          { name: 'extra', selected: false },
          { name: 'default_code', selected: false }
        ];

        $scope.selectTab = (tab) => {
          $scope.tabs.forEach((t) => t.selected = false);
          tab.selected = true;
        }

      }

    }

  })
