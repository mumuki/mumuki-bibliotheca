angular
  .module('editor')
  .directive('aceMarkdownToolbar', function ($filter,
                                             Modal) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-markdown-toolbar.html',
      scope: { editor: '=' },
      controller: ($scope) => {

        const MU = 'ム';
        const translate = $filter('translate');

        const update = (modifyEditor) =>
          (...args) => {
            modifyEditor(...args);

            const range = $scope.editor.selection.getRange();
            $scope.editor.editorScope.content = $scope.editor.session.getValue();
            setTimeout(() => {
              $scope.editor.selection.setSelectionRange(range);
            });
          };

        const insertText = update((translationKey, prefix, suffix='') => {
          const range = $scope.editor.selection.getRange();
          const text = $scope.editor.session.getTextRange(range) || translate(translationKey);

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
        });

        const insertBefore = (translationKey, item) => {
          insertText(translationKey, item);
        };
        const wrapText = (item) => {
          insertText('text', item, item);
        };

        $scope.number = () => {
          insertBefore('item', '1. ');
        };
        $scope.bullet = () => {
          insertBefore('item', '* ');
        };
        $scope.quote = () => {
          insertBefore('blockquote', '> ');
        };
        $scope.insertEmoji = (emoji) => {
          insertBefore('', `:${emoji}:`);
        };
        $scope.bold = () => {
          wrapText('**');
        };
        $scope.italic = () => {
          wrapText('_');
        };
        $scope.inlineCode = () => {
          wrapText('`');
        };
        $scope.image = () => {
          Modal.uploadImage((filename, link) => {
            insertText(filename, `<img src="${link}" alt="`, `" width="auto" height="auto">`);
          });
        };
        $scope.link = update((filename, filelink, prefix = '') => {
          const text = filename || translate('text');
          const link = filelink || translate('link');
          const range = $scope.editor.selection.getRange();
          $scope.editor.session.replace(range, `${prefix}[${text}](${link})`);
          $scope.editor.focus();
          range.start.column += (1 + prefix.length);
          range.end.column = range.start.column + text.length;
          $scope.editor.selection.setSelectionRange(range);
        });
        $scope.code = update(() => {
          const range = $scope.editor.selection.getRange();
          const code = $scope.editor.session.getTextRange(range) || translate('code');
          const language = translate('language');
          $scope.editor.session.replace(range, `\`\`\` ${language.toLowerCase()}\n${code}\n\`\`\`\n`);
          $scope.editor.focus();
          range.start.column += 4;
          range.end.row = range.start.row;
          range.end.column = range.start.column + language.length + 4;
          $scope.editor.selection.setSelectionRange(range);
        });
        $scope.mumuki = update(() => {
          $scope.editor.insert(MU);
          $scope.editor.focus();
        });
        $scope.gbsAttire = () => {
          Modal.createGobstonesAttire((link) => {
            insertText('', `<gs-attire attire-url="${link}"></gs-attire>`);
          });
        };

        const bindCtrl = (letter) => {
          return {
            win: `Ctrl-${letter}`,
            mac: `Command-${letter}`
          }
        };

        const command = (letter, callback) => {
          return {
            bindKey: bindCtrl(letter),
            exec: callback,
          }
        };

        $scope.editor.commands.addCommands([
          command('B', $scope.bold),
          command('K', $scope.link),
          command('I', $scope.italic),
          command('M', $scope.mumuki),
        ]);

      }

    }

  });
