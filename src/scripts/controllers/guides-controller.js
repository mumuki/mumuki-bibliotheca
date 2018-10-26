angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            $state,
                                            $stateParams,
                                            $filter,
                                            guides,
                                            Api,
                                            toastr,
                                            $controller,
                                            Modal,
                                            Guide) {
    $controller('HomeListController', {
      $scope, $state, Modal, $filter, toastr, list: guides, model: Guide,
      openStateId: 'editor.home.guides.detail',
      deleteFunction: (guide) => Api.deleteGuide(guide.id)
    });

    const translate = $filter('translate');
    const importMessage = translate('import');
    const message = translate('import_guide_from_github');

    $scope.newState = 'editor.home.guides.new';
    $scope.isGuides = true;

    $scope.import = () => Modal.importFromGithub(importMessage, message, (slug) => {
      return Api
        .importGuide(slug)
        .then(() => $state.go($state.current, $stateParams, { reload: true }))
    });
  });
