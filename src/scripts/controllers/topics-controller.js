angular
  .module('editor')
  .controller('TopicsController', function ($scope,
                                            $state,
                                            topics,
                                            Topic) {

    $scope.list = topics;
    $scope.Model = Topic;
    $scope.newState = 'editor.home.topics.new';

    $scope.open = (topic) => {
      $state.go('editor.home.topics.detail', topic.params());
    }


  });
