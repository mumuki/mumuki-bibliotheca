angular
  .module('editor')
  .controller('UploadImageController', function($scope,
                                                $stateParams,
                                                $uibModalInstance,
                                                onYesPromise,
                                                Api) {

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split('base64,')[1]);
        reader.onerror = (error) => reject(error);
      });
    }

    $scope.upload = () => {
      const file = document.querySelector('#upload-image').files[0];
      return getBase64(file)
        .then((base64) => Api.uploadImage({
          organization: $stateParams.org,
          repository: $stateParams.repo,
          filename: file.name,
          content: base64,
        }))
        .then(({content}) => onYesPromise(content.name, content.download_url))
        .finally(() => $uibModalInstance.close());
    }

  });
