angular
  .module('editor')
  .controller('TopicDetailController', function($scope,
                                                $sce,
                                                $filter,
                                                topic,
                                                guides,
                                                toastr,
                                                Guide,
                                                Api,
                                                CurrentItem,
                                                LeaveItem,
                                                Hotkeys) {

    const translate = $filter('translate');

    const addLesson = (lesson) => {
      const [org, repo] = lesson.slug.split('/');
      return Api.getGuide({ org, repo }).tap((guide) => {
        $scope.topic.addLesson(guide)
        $scope.$apply();
      });
    };

    $scope.topic = topic;
    $scope.guides = guides;

    $scope.Guide = Guide;

    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasGuide = (guide) => !_.some($scope.topic.lessons, { id: guide.id });

    $scope._save = () => {
      return Promise.resolve($scope.topic)
        .call('toSave')
        .tap((topic) => Api.saveTopic(topic))
        .tap((topic) => CurrentItem.setStored(topic))
        .tap((topic) => toastr.success(translate('topic_saved_successfully')));
    };

    $scope.save = () => {
      return $scope
        ._save()
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    };

    let _lessonSelected;
    let _complementSelected;

    $scope.selected = {
      get lesson() {
        return _lessonSelected;
      },
      set lesson(lesson) {
        _lessonSelected = lesson;
        addLesson(lesson);
      },
    }

    LeaveItem.bindTo($scope, $scope.topic);
    Hotkeys.bindSave($scope);

  });
