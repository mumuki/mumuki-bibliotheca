angular
  .module('editor')
  .directive('saveItem', function () {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/save-item.html',
      scope: {
        item: '=',
        save: '=',
      }

    }

  })


