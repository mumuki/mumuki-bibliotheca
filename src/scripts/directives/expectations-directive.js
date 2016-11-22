angular
  .module('editor')
  .directive('expectations', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/expectations.html',
      scope: {
        expectations: '='
      },
      controller: ($scope) => {

      }

    }

  })
