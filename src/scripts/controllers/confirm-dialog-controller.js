angular
  .module('editor')
  .controller('ConfirmDialogController', function($scope,
                                                  $sce,
                                                  $uibModalInstance,
                                                  title,
                                                  text,
                                                  onYesPromise) {

    $scope.title = title;
    $scope.text = text;

    $scope.yes = (...params) => {
      return onYesPromise(...params)
        .then(() => $uibModalInstance.close());
    }

    $scope.no = () => {
      $uibModalInstance.close();
    }

    $scope.trust = (html) => $sce.trustAsHtml(html);
  });
