angular
  .module('editor')
  .controller('SolutionModalController', function($scope,
                                                  $sce,
                                                  $uibModalInstance,
                                                  solution) {

    $scope.solution = solution;

    $scope.trust = (html) => $sce.trustAsHtml(html);

    $scope.colorClass = () => {
      switch (solution.status) {
        case 'passed':                 return 'success';
        case 'passed_with_warnings':   return 'warning';
        case 'failed': case 'errored': return 'danger';
        default:                       return 'default';
      }
    }

  });
