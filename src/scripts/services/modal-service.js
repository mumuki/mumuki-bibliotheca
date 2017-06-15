angular
  .module('editor')
  .service('Modal', function ($uibModal) {

    this.showLeaveItemConfirmation = (title, text, onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/confirm-dialog.html',
      controller: 'ConfirmDialogController',
      resolve: {
        title: () => title,
        text: () => text,
        onYesPromise: () => onYesPromise,
      }
    });

    this.solutionResults = (solution) => $uibModal.open({
      templateUrl: 'views/modals/solution-modal.html',
      controller: 'SolutionModalController',
      size: 'lg',
      resolve: {
        solution: () => solution
      }
    });

  });
