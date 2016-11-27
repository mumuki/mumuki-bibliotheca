angular
  .module('editor')
  .config(function (toastrConfig) {

    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      progressBar: false,
      target: 'body',
    });

  });
