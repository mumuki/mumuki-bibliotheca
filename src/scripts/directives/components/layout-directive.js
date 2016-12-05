angular
  .module('editor')
  .directive('layout', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/layout.html',
      scope: {
        exercise: '=',
      }

    }

  })


