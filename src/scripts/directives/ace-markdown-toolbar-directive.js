angular
  .module('editor')
  .directive('aceMarkdownToolbar', function ($filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-markdown-toolbar.html',
      scope: { editor: '=' },
      controller: ($scope) => {

        const MU = 'ム';
        const translate = $filter('translate');

        const insertBefore = (text, item) => {
          const range = $scope.editor.selection.getRange();
          $scope.editor.session.replace(range, `${item}${text}`);
          range.start.column += item.length;
          range.end.column = range.start.column + text.length;
          $scope.editor.focus();
          $scope.editor.selection.setSelectionRange(range);
        }

        const wrapText = (item) => {
          const range = $scope.editor.selection.getRange();
          const text = $scope.editor.session.getTextRange(range) || translate('text');
          $scope.editor.session.replace(range, `${item}${text}${item}`);
          $scope.editor.focus();
          range.start.column += item.length;
          range.end.column = range.start.column + text.length;
          $scope.editor.selection.setSelectionRange(range);
        }

        $scope.bold = () => {
          wrapText('**');
        }
        $scope.italic = () => {
          wrapText('_');
        }
        $scope.number = () => {
          insertBefore(translate('item'), '1. ');
        }
        $scope.bullet = () => {
          insertBefore(translate('item'), '* ');
        }
        $scope.image = () => {
          // TODO: IMPLEMENT
        }
        $scope.link = () => {
          const text = translate('text');
          const link = translate('link');
          const range = $scope.editor.selection.getRange();
          $scope.editor.session.replace(range, `[${text}](${link})`);
          $scope.editor.focus();
          range.start.column += 1;
          range.end.column = range.start.column + text.length;
          $scope.editor.selection.setSelectionRange(range);
        }
        $scope.inlineCode = () => {
          wrapText('`');
        }
        $scope.code = () => {
          const range = $scope.editor.selection.getRange();
          const code = $scope.editor.session.getTextRange(range) || translate('code');
          const language = translate('language');
          $scope.editor.session.replace(range, `\`\`\` ${language}\n${code}\n\`\`\`\n`);
          $scope.editor.focus();
          range.start.column += 4;
          range.end.row = range.start.row;
          range.end.column = range.start.column + language.length + 4;
          $scope.editor.selection.setSelectionRange(range);
        }
        $scope.quote = () => {
          insertBefore(translate('blockquote'), '> ');
        }
        $scope.mumuki = () => {
          $scope.editor.insert(MU);
          $scope.editor.focus();
        }

      }

    }

  })
