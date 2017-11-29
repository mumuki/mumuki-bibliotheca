angular
  .module('editor')
  .controller('ForkGuideFromGithubController', function($scope,
                                                        $sce,
                                                        $controller,
                                                        $uibModalInstance,
                                                        title,
                                                        text,
                                                        onYesPromise,
                                                        CurrentItem) {

    $controller('ConfirmDialogController', {$scope, $sce, $uibModalInstance, title, text, onYesPromise});

    $scope._yes = $scope.yes;
    
    $scope.CurrentItem = CurrentItem;

    $scope.yes = () => {
      return $scope._yes(CurrentItem.getOrganization())
    };

  });
