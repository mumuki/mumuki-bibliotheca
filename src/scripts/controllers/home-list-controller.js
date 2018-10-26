angular
  .module('editor')
  .controller('HomeListController', function ($scope,
                                              $state,
                                              Modal,
                                              $filter,
                                              toastr,
                                              list,
                                              model,
                                              openStateId,
                                              deleteFunction) {
    const translate = $filter("translate");

    $scope.list = list;
    $scope.Model = model;

    $scope.open = (item) => {
      $state.go(openStateId, item.params());
    };

    $scope.delete = (item) => {
      Modal.confirmYesNo('Mumuki', translate("delete_confirm", { "fullName": item.fullName() }), () => {
        return deleteFunction(item)
          .then(() => {
            _.remove($scope.list, item);
            toastr.success(translate('delete_success', { fullName: item.fullName() }));
          })
          .catch((ex) => {
            console.error("Error while deleting item.", ex, item);
            toastr.error("Error: " + ex.message);
          });
      });
    }
  });
