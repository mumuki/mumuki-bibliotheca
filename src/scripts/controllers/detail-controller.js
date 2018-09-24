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
      toastr.info(translate('saving'));
      return Promise
        .resolve($scope.item)
        .tap((item) => item.validate())
        .tap((item) => Slug.create(item, type))
        .call('getItem')
        .tap((item) => Api.saveItem(type)(item))
        .then((item) => item.constructor.from(item))
        .tap((item) => CurrentItem.set(item))
        .tap((item) => callback(item))
        .tap((item) => toastr.success(translate(`${type}_saved_successfully`)))
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    });

    $scope.hideSpinner = () => {
      const icon = $('.spinner').find('i.fa.fa-fw.fa-spinner.fa-spin');
      icon.addClass('caret');
      icon.removeClass('fa fa-fw fa-spinner fa-spin');
    };

    $scope.showSpinner = () => {
      const icon = $('.spinner').find('i.caret');
      icon.removeClass('caret');
      icon.addClass('fa fa-fw fa-spinner fa-spin');
    };

    LeaveItem.bindTo($scope);
    Hotkeys.bindSave($scope);

  });
