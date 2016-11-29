angular
  .module('editor')
  .controller('NewGuideController', function ($scope,
                                              $state,
                                              $controller,
                                              guide,
                                              GuideSaver,
                                              CurrentGuide) {

    CurrentGuide.set(guide);

    $controller('GuideDetailController', {
      $scope: $scope,
      guide: CurrentGuide.get(),
    });

    $scope.isNew = true;

    $scope.save = () => {
      return GuideSaver
        .save($scope.guide)
        .then(() => $state.go('editor.home.guides.detail', $scope.guide.params()));
    };

  });
