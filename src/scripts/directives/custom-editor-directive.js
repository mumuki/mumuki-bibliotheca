angular
  .module('editor')
  .directive('customEditor', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/custom-editor.html',
      scope: {
        exercise: '=',
        content: '='
      },
      controller: ($scope) => {
      }
    }
  })
