angular
  .module('editor')
  .controller('NavbarController', function ($scope,
                                            Breadcrumb) {

    $scope.breadcrumb = Breadcrumb;

  })
