angular
  .module('editor')
  .controller('NewGuideController', function ($scope,
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
      return GuideSaver.save($scope.guide);
    };

  });
