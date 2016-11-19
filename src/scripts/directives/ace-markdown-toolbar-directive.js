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

        const insertText = (translationKey, prefix, suffix='') => {
          const range = $scope.editor.selection.getRange();
          const text = $scope.editor.session.getTextRange(range) || translate(translationKey);
          $scope.editor.session.replace(range, `${prefix}${text}${suffix}`);
          range.start.column += prefix.length;
          range.end.column = range.start.column + text.length;
          $scope.editor.focus();
          $scope.editor.selection.setSelectionRange(range);
        }
        const insertBefore = (translationKey, item) => {
          insertText(translationKey, item);
        }
        const wrapText = (item) => {
          insertText('text', item, item);
        }

        $scope.number = () => {
          insertBefore('item', '1. ');
        }
        $scope.bullet = () => {
          insertBefore('item', '* ');
        }
        $scope.quote = () => {
          insertBefore('blockquote', '> ');
        }
        $scope.bold = () => {
          wrapText('**');
        }
        $scope.italic = () => {
          wrapText('_');
        }
        $scope.inlineCode = () => {
          wrapText('`');
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
        $scope.code = () => {
          const range = $scope.editor.selection.getRange();
          const code = $scope.editor.session.getTextRange(range) || translate('code');
          const language = translate('language');
          $scope.editor.session.replace(range, `\`\`\` ${language.toLowerCase()}\n${code}\n\`\`\`\n`);
          $scope.editor.focus();
          range.start.column += 4;
          range.end.row = range.start.row;
          range.end.column = range.start.column + language.length + 4;
          $scope.editor.selection.setSelectionRange(range);
        }
        $scope.mumuki = () => {
          $scope.editor.insert(MU);
          $scope.editor.focus();
        }

      }

    }

  })
