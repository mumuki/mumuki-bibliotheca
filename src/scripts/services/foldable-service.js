angular
  .module('editor')
  .service('Foldable', function () {

    this.scope = ($scope) => {
      return _.defaults($scope, { isFoldable: '=foldable' });
    }

    this.from = ($scope) => {

      let _minimized = true;

      $scope.isMinimized = () => {
          return _minimized;
      }

      $scope.showMinimized = () => {
          return !$scope.isFoldable || ($scope.isFoldable && !$scope.isMinimized());
      }

      $scope.toggleMinimized = () => {
        return _minimized = !_minimized;
      }

    }

  });
