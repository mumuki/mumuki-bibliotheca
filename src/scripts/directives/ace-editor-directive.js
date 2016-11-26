angular
  .module('editor')
  .directive('aceEditor', function ($sce,
                                    $filter,
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
          AceEditor.update($scope.editor, $scope.placeholder);
        }

        const getMode = () => {
          return modes[$scope.mode] || $scope.mode;
        }

        $scope.content = $scope.content || '';
        $scope.placeholder = translate($scope.placeholder || `${$scope.header}_placeholder`);

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

      }

    }

  })
