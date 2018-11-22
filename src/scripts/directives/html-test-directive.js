angular
  .module('editor')
  .directive('htmlTest', function ($translate,
                                   $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/evaluation/html-test.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {
        $scope.defaultData = {
          output: '',
          tests: '',
          options: 'output_ignore_scripts: true\noutput_ignore_styles: true'
        };

        $scope.aceModes = {
          output: 'html',
          tests: 'javascript',
          options: 'yaml'
        };

        $scope.extraOptions = [
          "_last_alert_message_",
          "_last_confirm_message_",
          "_last_prompt_message_",
          "_confirm_response_ = ...",
          "_prompt_response_ = ...",
          "_dispatch_(event, node)",
          "_wait_for_(condition, callback)",
          "_nock_(url)"
        ];
      }
    }
  })
