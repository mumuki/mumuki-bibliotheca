angular
  .module('editor')
  .service('Hotkeys', function (hotkeys) {

    this.bindSave = ($scope) => {
      hotkeys
        .bindTo($scope)
        .add({
          combo: ['ctrl+s', 'command+s'],
          allowIn: ['SELECT', 'INPUT', 'TEXTAREA'],
          callback: (event) => {
            $scope.save();
            event.preventDefault();
          },
        });
    };

  });
