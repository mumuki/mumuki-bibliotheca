angular
  .module('editor')
  .directive('saveItem', function (CurrentItem) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/save-item.html',
      scope: {
        item: '=',
        save: '&',
      },
      controller: ($scope) => {

        $scope.hasChanges = () => CurrentItem.hasChanges($scope.item.getItem());

      }

    }

  })


