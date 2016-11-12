angular
  .module('editor')
  .directive('aceWithMarkdown', function ($sce,
                                          AceEditor,
                                          Api) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-with-markdown.html',
      scope: {
        content: '=',
        placeholder: '@'
      },
      controller: ($scope) => {

        let _html;

        const MU = 'ム';
        const MU_PATTERN = ':mu:';

        const WRITE = 'write';
        const PREVIEW = 'preview';

        const getCursorPosition = (content) => {
          const linesBeforeMu = content.split(MU_PATTERN)[0].split('\n');
          const row = linesBeforeMu.length - 1;
          const column = linesBeforeMu[row].length + 1;
          return { row, column };
        }

        const replaceMu = (editor, content) => {
          if (_(content).includes(MU_PATTERN)) {
            const cursorPosition = getCursorPosition(content);
            editor.getSession().setValue(content.replace(MU_PATTERN, MU));
            editor.selection.moveTo(cursorPosition.row, cursorPosition.column);
          }
        };

        const renderMarkdown = () => {
          return Api.renderMarkdown($scope.content).then((markdown) => _html = markdown);
        };

        $scope.html = () => {
          return $sce.trustAsHtml(_html);
        }

        $scope.active = (tab) => {
          $scope.selectedTab = tab;
        };

        $scope.content = $scope.content || '';
        $scope.selectedTab = WRITE;

        $scope.aceEditor = AceEditor.defaults({
          mode: 'markdown',
          showGutter: false,
          rendererOptions: { minLines: 1 },
          onLoad: (editor) => {
            $scope.editor = editor;
            AceEditor.onLoadDefault(editor);
            editor.setHighlightGutterLine(false);
            const watchDestroyer = $scope.$watch('content', (content) => replaceMu(editor, content));
            $scope.$on('destroy', () => watchDestroyer);
          },
          onChange: () => AceEditor.update($scope.editor, $scope.placeholder)
        });

        $scope.$watch('selectedTab', (newVal) => {
          if (newVal === PREVIEW) {
            renderMarkdown().then(() => $scope.$apply());
          }
        });
      }

    }

  })
