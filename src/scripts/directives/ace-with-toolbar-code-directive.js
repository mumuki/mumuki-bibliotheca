angular
  .module('editor')
  .directive('aceWithToolbarCode', function ($sce,
                                             $filter,
                                             AceEditor) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-with-toolbar-code.html',
      scope: {
        from: '@',
        mode: '=',
        comment: '=',
        content: '=',
        template: '=',
        placeholder: '='
      },
      controller: ($scope) => {

        const update = () => AceEditor.update($scope.editor, $scope.placeholder);

        $scope.content = $scope.content || '';

        $scope.aceEditor = AceEditor.defaults({
          mode: $scope.mode,
          showGutter: true,
          onChange: () => update(),
          onLoad: (editor) => {
            $scope.editor = editor;
            AceEditor.onLoadDefault(editor);
            update();
            editor.setHighlightGutterLine(false);
          }
        });

        $scope.resetContent = () => {
          $scope.content = $scope.template
        }

      }

    }

  })
