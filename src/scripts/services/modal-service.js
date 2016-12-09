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

  });
