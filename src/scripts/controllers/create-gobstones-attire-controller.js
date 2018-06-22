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

    const BASE64_HEADER = 'data:image/png;base64,';
    const COLORS = ['red', 'green', 'blue', 'black'];
    const MAX_FILE_SIZE = 256 * 1024;

    $scope.borders = ['top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft'];
    $scope.isImporting = false;
    $scope.attire = {
      enabled: true,
      rules: [],
      borders: {}
    };

    $scope.importFromUrl = () => {
      const url = prompt($translate('insert_url'));
      if (!url) return;

      $scope.isImporting = true;
      $.getJSON(url).then((attire) => {
        $scope.attire = attire;
      }).always(() => {
        $scope.isImporting = false;
        $timeout(() => $scope.$apply());
      });
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
    $scope.addBorders = () => {
      $scope.borders.forEach((border) => {
        $scope.attire.borders[border] = null;
      });
    };
    $scope.removeBorder = (border) => {
      $scope.attire.borders[border] = undefined;
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
      return !hasInvalidRules() ? getAttire() : Promise.reject(new Error('Invalid rules'));
    };
    const fileToSet = () => {
      const file = getFile();
      return !hasInvalidSize(file) ? getBase64(file) : Promise.reject(new Error('Invalid size'));
    };

    const hasInvalidRules = () => {
      return (
        _.some($scope.attire.rules, isInvalidRule) ||
        _.some($scope.borders, isInvalidBorder)
      );
    };
    const isInvalidRule = (rule) => !rule.image || hasInvalidValues(rule);
    const isInvalidBorder = (border) => $scope.attire.borders[border] === null;
    const hasInvalidValues = (rule) =>
      _.some(
        COLORS,
        (color) => {
          const value = rule.when[color];
          return !_.isFinite(parseInt(value)) && value !== "*" && value !== "+";
        }
      );
    const hasInvalidSize = (file) => {
      const fileSize = _.get(file, 'size', 0);
      return fileSize < 0 || fileSize > MAX_FILE_SIZE;
    };

    const withUserImage = (action) => {
      input.onchange = () => {
        fileToSet()
          .then((base64) => {
            action(base64);
            $timeout(() => { $scope.$apply(); });
          })
          .catch(() => doFailure('upload_image_failed'))
          .finally(() => { input.value = null });
      };

      $(input).trigger("click");
    };
    const getAttire = () => {
      const attire = _.cloneDeep($scope.attire);
      const adaptValue = (value) => {
        return value === '*' || value === '+' ? value : parseInt(value)
      };
      attire.rules.forEach((rule) => {
        COLORS.forEach((color) => {
          rule.when[color] = adaptValue(rule.when[color]);
        });
      });

      return Promise.resolve(attire);
    };
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { resolve(reader.result) };
        reader.onerror = (error) => reject(error);
      });
    };
    const isBase64 = (url) => _.startsWith(url, BASE64_HEADER);
    const stripBase64 = (url) => url.replace(BASE64_HEADER, '');
    const doFailure = (error) => toastr.error($translate(error));
    const getFile = () => input.files[0];

    $scope.setImage = (rule) => {
      withUserImage((base64) => { rule.image = base64; });
    };

    $scope.setBorderImage = (border) => {
      withUserImage((base64) => { $scope.attire.borders[border] = base64; });
    }

    $scope.upload = () => {
      return fileToUpload()
        .then((attire) => {
          return Promise.each(attire.rules, (rule) => {
            if (!isBase64(rule.image)) return;

            return Api
              .uploadAsset($stateParams, { filename: `attires/image.png`, content: stripBase64(rule.image) })
              .get('download_url')
              .then((url) => { rule.image = url });
          }).then(() => {
            return Api.uploadAsset($stateParams, { filename: 'attires/config.json', content: btoa(angular.toJson(attire)) });
          });
        })
        .then((content) => onYesPromise(content.download_url))
        .then(() => $uibModalInstance.close())
        .catch((e) => doFailure('gobstones_attire_incomplete'));
    };
  });
