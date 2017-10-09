angular
  .module('editor')
  .directive('aceCodeToolbar', function ($filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-code-toolbar.html',
      scope: {
        editor: '=',
        comment: '='
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
          insertText('', `${$scope.comment.start}${separator1}${type}${separator2}${$scope.comment.end}`);
        }

        $scope.test = () => betweenLanguageComment('test');
        $scope.extra = () => betweenLanguageComment('extra');
        $scope.content = () => betweenLanguageComment('content');
        $scope.ignoreContentOnQuery = () => betweenLanguageComment('IgnoreContentOnQuery', '[', ']');

        $scope.solution = () => insertText('exercise_number', '/*...solution[', ']...*/');
        $scope.previousSolution = () => insertText('', '/*...previousSolution...*/');
      }

    }

  });
