angular
  .module('editor')
  .directive('editorType', function (Editor) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/editor-type.html',
      scope: {
        exercise: '=',
      },
      controller: ($scope) => {

        $scope.Editor = Editor;

      }

    }

  })


