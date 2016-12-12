angular
  .module('editor')
  .controller('DetailController', function ($scope,
                                            $filter,
                                            toastr,
                                            item,
                                            Api,
                                            Slug,
                                            Hotkeys,
                                            Debounce,
                                            LeaveItem,
                                            CurrentItem) {

    const translate = $filter('translate');

    $scope.item = item;
    $scope.getItem = () => $scope.item.getItem();

    $scope.publish = Debounce.for((type, callback = () => {}) => {
      return Promise
        .resolve($scope.item)
        .tap((item) => item.validate())
        .tap((item) => Slug.create(item, type))
        .call('getItem')
        .tap((item) => Api.saveItem(type)(item))
        .tap((item) => CurrentItem.set(item))
        .tap((item) => callback(item))
        .tap((item) => toastr.success(translate(`${type}_saved_successfully`)))
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    })

    LeaveItem.bindTo($scope);
    Hotkeys.bindSave($scope);

  });
