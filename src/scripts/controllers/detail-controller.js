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
    $scope.getRawItem = () => _.cloneDeep($scope.item).toSave();

    LeaveItem.bindTo($scope);
    Hotkeys.bindSave($scope);

  });
