angular
  .module('editor')
  .controller('SolutionModalController', function($scope,
                                                  $sce,
                                                  $timeout,
                                                  $uibModalInstance,
                                                  $anchorScroll,
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
    };

    $scope.visibleExpectations = () => _.reject(solution.expectation_results, {result: 'passed'});

    $scope.toggleIn = (index) => angular.element(`#example-result-${index}`).toggleClass('in');

    $timeout(() => $(document).renderMuComponents());

  });
