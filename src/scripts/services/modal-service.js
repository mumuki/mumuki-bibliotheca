angular
  .module('editor')
  .service('Modal', function ($uibModal) {

    this.confirmYesNo = (title, text, onYesPromise) => $uibModal.open({
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

    this.importFromGithub = (title, text, onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/import-guide-from-github-modal.html',
      controller: 'ImportGuideFromGithubController',
      resolve: {
        title: () => title,
        text: () => text,
        onYesPromise: () => onYesPromise,
      }
    });

    this.uploadImage = (onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/upload-image-modal.html',
      controller: 'UploadImageController',
      size: 'lg',
      resolve: {
        onYesPromise: () => onYesPromise,
      }
    });

    this.createGobstonesAttire = (onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/create-gobstones-attire.html',
      controller: 'CreateGobstonesAttireController',
      size: 'lg',
      resolve: {
        onYesPromise: () => onYesPromise,
      }
    });

    this.createGobstonesToolbox = (onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/create-gobstones-toolbox.html',
      controller: 'CreateGobstonesToolboxController',
      size: 'lg',
      resolve: {
        onYesPromise: () => onYesPromise,
      }
    });

    this.forkFromGithub = (title, text, onYesPromise) => $uibModal.open({
      templateUrl: 'views/modals/fork-guide-from-github-modal.html',
      controller: 'ForkGuideFromGithubController',
      resolve: {
        title: () => title,
        text: () => text,
        onYesPromise: () => onYesPromise,
      }
    });

  });
