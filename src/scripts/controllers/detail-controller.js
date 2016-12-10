angular
  .module('editor')
  .controller('DetailController', function ($scope,
                                            toastr,
                                            item,
                                            Api,
                                            Hotkeys,
                                            LeaveItem,
                                            CurrentItem) {

    $scope.item = item;
    $scope.getItem = () => $scope.item.getItem();

    LeaveItem.bindTo($scope);
    Hotkeys.bindSave($scope);

  });
