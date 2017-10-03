angular
  .module('editor')
  .controller('ImportGuideFromGithubController', function($scope,
                                                          $sce,
                                                          $controller,
                                                          $uibModalInstance,
                                                          title,
                                                          text,
                                                          onYesPromise,
                                                          Slug) {

    $controller('ConfirmDialogController', {$scope, $sce, $uibModalInstance, title, text, onYesPromise});

    $scope._yes = $scope.yes;

    $scope.slug = Slug.empty();

    $scope.yes = () => {
      $scope._yes($scope.slug);
    }

  });
