angular
  .module('editor')
  .controller('TopicsController', function ($scope,
                                            $state,
                                            $filter,
                                            topics,
                                            $controller,
                                            Topic,
                                            Modal,
                                            toastr,
                                            Api) {
    $controller('HomeListController', {
      $scope, $state, Modal, $filter, toastr, list: topics, model: Topic,
      openStateId: 'editor.home.topics.detail',
      deleteFunction: (topic) => Api.deleteTopic(topic.params())
    });

    $scope.newState = 'editor.home.topics.new';
  });
