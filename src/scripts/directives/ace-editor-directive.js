angular
  .module('editor')
  .directive('aceEditor', function ($sce,
                                    $filter,
                                    $timeout,
                                    AceEditor,
                                    Foldable) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/ace-editor.html',
      scope: Foldable.scope({
        mode: '=',
        header: '@',
        content: '=',
        placeholder: '@',
      }),
      controller: ($scope) => {

        Foldable.from($scope);

        const translate = $filter('translate');

        const modes = {
          c: 'c_cpp',
          cpp: 'c_cpp',
          text: 'plain',
          qsim: 'assembly_x86',
        }

        const update = () => {
          const placeholderKey = $scope.placeholder || `placeholder_${$scope.header}`
          AceEditor.update($scope.editor, translate(placeholderKey));
        }

        const getMode = () => {
          return modes[$scope.mode] || $scope.mode;
        }

        $scope.content = $scope.content || '';

        $scope.aceEditor = AceEditor.defaults({
          mode: getMode(),
          rendererOptions: { minLines: 15 },
          onChange: () => update(),
          onLoad: (editor) => {
            $scope.editor = editor;
            AceEditor.onLoadDefault(editor);
            $scope.$on('destroy', $scope.$watch('mode', (mode) => {
              editor.getSession().setMode(`ace/mode/${getMode()}`);
            }));
            update();
          }
        });

        $scope.$watch(() => $scope.isMinimized(), (isMinimized) => {
          if (!isMinimized) $timeout(update);
        });

      }

    }

  })
