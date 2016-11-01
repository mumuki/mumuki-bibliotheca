angular
  .module('editor')
  .controller('NavbarController', function ($scope,
                                            $state,
                                            Breadcrumb,
                                            Auth) {

    $scope.auth = Auth;
    $scope.breadcrumb = Breadcrumb;

    $scope.login = () => {
      Auth.signin(() => $state.go('editor.login', {}, { reload: true }));
    }

  });
