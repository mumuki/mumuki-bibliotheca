angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            $state,
                                            $stateParams,
                                            $filter,
                                            guides,
                                            Api,
                                            toastr,
                                            Modal,
                                            Guide) {
    const translate = $filter('translate');
    const importMessage = translate('import');
    const message = translate('import_guide_from_github');

    $scope.list = guides;
    $scope.Model = Guide;
    $scope.newState = 'editor.home.guides.new';

    $scope.isGuides = true;

    $scope.open = (guide) => {
      $state.go('editor.home.guides.detail', guide.params());
    };

    $scope.import = () => Modal.importFromGithub(importMessage, message, (slug) => {
      return Api
        .importGuide(slug)
        .then(() => $state.go($state.current, $stateParams, { reload: true }))
    });

    $scope.delete = (guide) => {
      Modal.confirmYesNo('Mumuki', translate("delete_confirm", { "fullName": guide.fullName() }), () => {
        return Api
          .deleteGuide(guide.id)
          .then(() => {
            _.remove($scope.list, guide);
            toastr.success(translate('delete_success', { fullName: guide.fullName() }));
          })
          .catch((ex) => {
            console.error("Error while deleting item.", ex, guide);
            toastr.error("Error: " + ex.statusText);
          });
      });
    }
  });
