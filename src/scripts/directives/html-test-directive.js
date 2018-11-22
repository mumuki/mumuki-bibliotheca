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
        // TODO
      }
    }
  })
