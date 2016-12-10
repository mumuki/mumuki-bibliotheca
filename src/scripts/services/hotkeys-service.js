angular
  .module('editor')
  .service('Hotkeys', function (hotkeys,
                                CurrentItem) {

    this.bindSave = ($scope) => {
      hotkeys
        .bindTo($scope)
        .add({
          combo: ['ctrl+s', 'command+s'],
          allowIn: ['SELECT', 'INPUT', 'TEXTAREA'],
          callback: (event) => {
            event.preventDefault();
            if (CurrentItem.hasChanges($scope.getRawItem())) {
              $scope.save();
            }
          },
        });
    };

  });
