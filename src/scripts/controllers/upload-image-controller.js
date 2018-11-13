angular
  .module('editor')
  .controller('UploadImageController', function ($scope,
                                                 $filter,
                                                 $timeout,
                                                 $stateParams,
                                                 toastr,
                                                 $uibModalInstance,
                                                 onYesPromise,
                                                 Api) {

    const $translate = $filter('translate');

    const MAX_FILE_SIZE = 256 * 1024;

    $scope.UPLOAD = 'UPLOAD';
    $scope.URL = 'URL';

    $scope.active = $scope.UPLOAD;
    $scope.image = {};

    let input;

    const humanSize = (file) => {
      return `${Math.round((file.size / 1024) * 100) / 100} KB`;
    };

    $timeout(() => {
      input = document.querySelector('#upload-image');
      input.onchange = () => {
        const file = getFile();
        $scope.description = file ? `${file.name} - ${humanSize(file)}` : '';
        $scope.$apply();
      }
    });

    const getFile = () => input.files[0];

    const doFailure = (err) => toastr.error($translate('upload_image_failed'));

    const fileToUpload = () => {
      const file = getFile();
      return isValid(file) ? getBase64(file) : Promise.reject(new Error());
    };

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split('base64,')[1]);
        reader.onerror = (error) => reject(error);
      });
    };

    const isValid = (file) => {
      const fileSize = _.get(file, 'size', 0);
      return 0 < fileSize && fileSize <= MAX_FILE_SIZE;
    };

    $scope.cancel = () => $uibModalInstance.close();

    $scope.upload = () => $scope.active === $scope.UPLOAD ? $scope.uploadImage() : $scope.uploadURL();

    $scope.uploadURL = () => {
      return Promise.resolve()
        .then(() => onYesPromise('', $scope.image.url))
        .then(() => $uibModalInstance.close())
        .catch((err) => doFailure(err));
    };

    $scope.uploadImage = () => {
      return fileToUpload()
        .then((content) => Api.uploadAsset($stateParams, { filename: getFile().name, content }))
        .then((content) => onYesPromise(content.name, content.download_url))
        .then(() => $uibModalInstance.close())
        .catch((err) => doFailure(err));
    }
  });
