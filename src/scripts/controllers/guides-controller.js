angular
  .module('editor')
  .controller('GuidesController', function ($scope,
                                            $state,
                                            $stateParams,
                                            $filter,
                                            guides,
                                            Api,
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
    }

    $scope.import = () => {
      return Modal.importFromGithub(importMessage, message, (slug) => Api.importGuide(slug));
    }

  });
