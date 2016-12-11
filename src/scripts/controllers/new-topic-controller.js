angular
  .module('editor')
  .controller('NewTopicController', function ($scope,
                                              $state,
                                              $controller,
                                              topic,
                                              guides,
                                              toastr,
                                              CurrentItem) {

    CurrentItem.set(topic);

    $controller('TopicDetailController', {
      $scope: $scope,
      topic: CurrentItem.get(),
      guides: guides,
    });

    $scope.isNew = true;

    $scope.save = () => {
      return $scope.publish('topic', (item) => {
        $state.go('editor.home.topics.detail', item.params());
      });
    };


  });
