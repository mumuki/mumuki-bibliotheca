angular
  .module('editor')
  .controller('CreateGobstonesToolboxController', function($scope,
                                                $filter,
                                                $timeout,
                                                $stateParams,
                                                toastr,
                                                $uibModalInstance,
                                                onYesPromise,
                                                Api) {

    const $translate = $filter('translate');

    $scope.toolbox = `
<category name="${$translate('gobstones_toolbox_commands')}">
  <block type="${$translate('gobstones_toolbox_put')}"></block>
</category>
<category name="Procedimientos primitivos">
</category>
<category name="Funciones primitivas">
</category>
<category name="${$translate('gobstones_toolbox_my_procedures')}" custom="PROCEDURE_CALLS">
</category>
<category name="${$translate('gobstones_toolbox_my_functions')}" custom="FUNCTION_CALLS">
</category>
`;

    $scope.upload = () => {
      return Api.uploadAsset($stateParams, { filename: 'toolbox.xml', content: btoa($scope.toolbox) })
        .then((content) => onYesPromise(content.download_url))
        .then(() => $uibModalInstance.close());
    };
  });
