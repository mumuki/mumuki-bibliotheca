import jsyaml from "js-yaml"

angular
  .module('editor')
  .directive('htmlTest', function ($translate,
                                   $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/evaluation/html-test.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {
        $scope.defaultData = {
          output: '',
          tests: '',
          options: 'output_ignore_scripts: true\noutput_ignore_styles: true'
        };

        $scope.aceModes = {
          output: 'html',
          tests: 'javascript',
          options: 'yaml'
        };
      }
    }
  })
