angular
  .module('editor')
  .controller('GuideDetailController', function ($scope,
                                                 $state,
                                                 $stateParams,
                                                 $filter,
                                                 $controller,
                                                 toastr,
                                                 guide,
                                                 CurrentItem,
                                                 GuideSaver,
                                                 Modal,
                                                 Api) {

    const translate = $filter('translate');

    $controller('DetailController', {
      $scope: $scope,
      item: CurrentItem.get()
    });

    $scope.addExercise = () => GuideSaver.addExercise($scope.item);

    $scope.moveExerciseTo = function (index, exercise) {
      $scope.item.moveExerciseTo(index, exercise);
      return true;
    };

    $scope.save = () => {
      return $scope.publish('guide', (item) => {
        $scope.item = item;
      });
    };

    $scope.fork = (guide) => {
      Modal.forkFromGithub(translate('copy_guide'), translate('copy_guide_text'), (organization) => {
        return Api
          .forkGuide($stateParams, organization)
          .then(() => $state.go('editor.home.guides.detail', { org: organization, repo: $stateParams.repo }, {reload: true}))
          .then(() => toastr.success(translate('guide_forked_successfully', { fullName: guide.fullName() })))
          .catch((response) => {
            return (response.status == 400) ?
              toastr.error(translate('guide_already_exists', { fullName: guide.fullName() })) :
              toastr.error(translate('guide_fork_fails'));
          })
      });
    }

  });
