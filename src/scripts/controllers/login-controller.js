angular
  .module('editor')
  .controller('LoginController', function($scope,
                                          $controller,
                                          Auth) {

    $controller('HomeController', { $scope });

    $scope.click = (state) => Auth.signin(() => state.click());

  });
