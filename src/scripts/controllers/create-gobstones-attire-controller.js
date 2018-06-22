angular
  .module('editor')
  .controller('CreateGobstonesAttireController', function($scope,
                                                $filter,
                                                $timeout,
                                                $stateParams,
                                                toastr,
                                                $uibModalInstance,
                                                onYesPromise,
                                                Api) {

    const $translate = $filter('translate');

    const MAX_FILE_SIZE = 256 * 1024;

    $scope.attire = {
      enabled: true,
      rules: [],
      borders: {}
    };

    $scope.addRule = (red = "", green = "", blue = "", black = "") => {
      $scope.attire.rules.push({
        when: { red, green, blue, black },
        image: null
      });
    };

    $scope.removeRule = (rule) => {
      const index = $scope.attire.rules.indexOf(rule);
      $scope.attire.rules.splice(index, 1);
    };

    $scope.moveRuleUp = (rule) => {
      const index = $scope.attire.rules.indexOf(rule);
      if (index === 0) return;
      $scope.attire.rules.splice(index, 1);
      $scope.attire.rules.splice(index - 1, 0, rule);
    };

    $scope.moveRuleDown = (rule) => {
      const index = $scope.attire.rules.indexOf(rule);
      if (index === $scope.attire.rules.length - 1) return;
      $scope.attire.rules.splice(index, 1);
      $scope.attire.rules.splice(index + 1, 0, rule);
    };

    $scope.addRule();

    let input;
    $timeout(() => {
      input = document.querySelector('#upload-image');
    });

    const fileToUpload = () => {
      const file = getFile();
      return isValid(file) ? getBase64(file) : Promise.reject(new Error('Invalid size'));
    }
    const doFailure = (err) => toastr.error($translate('upload_image_failed'));
    const isValid = (file) => {
      const fileSize = _.get(file, 'size', 0);
      return fileSize > 0 && fileSize <= MAX_FILE_SIZE;
    };
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { resolve(reader.result) };
        reader.onerror = (error) => reject(error);
      });
    };
    const getFile = () => input.files[0];
    const humanSize = (file) => {
      return `${Math.round((file.size / 1024) * 100) / 100} KB`;
    }

    $scope.setImage = (rule) => {
      input.onchange = () => {
        fileToUpload()
          .then((base64) => {
            rule.image = base64;
            $timeout(() => { $scope.$apply(); });
          })
          .catch(doFailure);
      };

      $(input).trigger("click");
    };

    $scope.upload = () => {

    };
  });
