angular
  .module('editor')
  .directive('aceCodeToolbar', function ($filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-code-toolbar.html',
      scope: {
        editor: '=',
        comment: '=',
        from: '='
      },
      controller: ($scope) => {

        const insertText = (content, prefix, suffix='') => {
          const range = $scope.editor.selection.getRange();
          const text = $scope.editor.session.getTextRange(range) || content;

          const range2 = $scope.editor.selection.getRange();
          range2.start.column -= prefix.length;
          range2.end.column = range.start.column + text.length + suffix.length;

          const text2 = $scope.editor.session.getTextRange(range2);
          if (_.startsWith(text2, prefix) && _.endsWith(text2, suffix)) {
            $scope.editor.session.replace(range2, `${text}`);
            range2.end.column = range2.start.column + text.length;
            $scope.editor.focus();
            $scope.editor.selection.setSelectionRange(range2);
          } else {
            $scope.editor.session.replace(range, `${prefix}${text}${suffix}`);
            range.start.column += prefix.length;
            range.end.column = range.start.column + text.length;
            $scope.editor.focus();
            $scope.editor.selection.setSelectionRange(range);
          }
        };

        const betweenLanguageComment = (type, separator1 = '...', separator2 = '...') => {
          const text2 = separator2 === '...' ? `${type}${separator2}${$scope.comment.end}` : '';
          const text3 = separator2 !== '...' ? `${type}${separator2}${$scope.comment.end}` : '';
          const text1 = `${$scope.comment.start}${separator1}${text2}`;
          insertText('', text1, text3);
        }

        $scope.test = () => betweenLanguageComment('test');
        $scope.extra = () => betweenLanguageComment('extra');
        $scope.content = () => betweenLanguageComment('content');
        $scope.ignoreContentOnQuery = () => betweenLanguageComment('IgnoreContentOnQuery', '[', ']');

        $scope.absoluteSolution = () => betweenLanguageComment('1', '...solution[', ']...');
        $scope.relativeSolution = () => betweenLanguageComment('1', '...solution[-', ']...');
        $scope.previousSolution = () => betweenLanguageComment('previousSolution');

        $scope.userEmail = () => betweenLanguageComment('user_email');
        $scope.userFirstName = () => betweenLanguageComment('user_first_name');
        $scope.userLastName = () => betweenLanguageComment('user_last_name');
      }
    }

  });
