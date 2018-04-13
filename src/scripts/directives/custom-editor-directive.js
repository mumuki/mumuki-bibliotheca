angular
  .module('editor')
  .directive('customEditor', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/custom-editor.html',
      scope: {
        exercise: '=',
        content: '=',
        extraAttributes: '='
      },
      controller: ($scope) => {
      },
      compile: (element) => {
        return function (scope, element) {
          const editorTag = `mu-${scope.exercise.getLanguage()}-custom-editor`;
          element.prepend(`<${editorTag} ${scope.extraAttributes || ""} > </${editorTag}>`);
        };
      }
    }
  })
