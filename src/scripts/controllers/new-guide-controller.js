angular
  .module('editor')
  .controller('NewGuideController', function ($scope,
                                              $state,
                                              $controller,
                                              guide,
                                              GuideSaver,
                                              CurrentItem) {
    console.log("alalal");
    CurrentItem.set(guide);

    $controller('GuideDetailController', {
      $scope: $scope,
      guide: CurrentItem.get(),
    });

    $scope.isNew = true;

    $scope.save = () => {
      return $scope.publish('guide', (item) => {
        $state.go('editor.home.guides.detail', item.params());
      });
    };

  });
