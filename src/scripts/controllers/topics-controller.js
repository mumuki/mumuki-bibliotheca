angular
  .module('editor')
  .controller('TopicsController', function ($scope,
                                            $state,
                                            $filter,
                                            topics,
                                            Topic,
                                            Modal,
                                            toastr,
                                            Api) {
    const translate = $filter('translate');

    $scope.list = topics;
    $scope.Model = Topic;
    $scope.newState = 'editor.home.topics.new';

    $scope.open = (topic) => {
      $state.go('editor.home.topics.detail', topic.params());
    };

    $scope.delete = (topic) => {
      Modal.confirmYesNo('Mumuki', translate("delete_confirm", {"fullName": topic.fullName()}), () => {
        return Api
          .deleteTopic(topic.params())
          .then(() => {
            _.remove($scope.list, topic);
            toastr.success(translate('delete_success', { fullName: topic.fullName() }));
          })
          .catch((ex) => {
            console.error("Error while deleting item.", ex, topic);
            toastr.error("Error: " + ex.message);
          });
      });
    }
  });
