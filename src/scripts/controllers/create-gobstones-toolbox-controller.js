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
<category name="Comandos">
  <block type="Poner"></block>
</category>
<category name="Procedimientos primitivos">
</category>
<category name="Funciones primitivas">
</category>
<category name="Mis procedimientos" custom="PROCEDURE_CALLS">
</category>
<category name="Mis funciones" custom="FUNCTION_CALLS">
</category>
`;

    $scope.upload = () => {
      return Api.uploadAsset($stateParams, { filename: 'toolbox.xml', content: btoa($scope.toolbox) })
        .then((content) => onYesPromise(content.download_url))
        .then(() => $uibModalInstance.close());
    };
  });
