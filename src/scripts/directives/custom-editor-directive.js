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
      },
      compile: (element) => {
        return function (scope, element) {
          const editor_tag = `mu-${scope.exercise.getLanguage()}-custom-editor`;
          element.prepend(`<${editor_tag}> </${editor_tag}>`);
        };
      }
    }
  })
