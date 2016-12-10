angular
  .module('editor')
  .controller('TopicDetailController', function($scope,
                                                $sce,
                                                $filter,
                                                $controller,
                                                topic,
                                                guides,
                                                toastr,
                                                Guide,
                                                Api,
                                                CurrentItem) {

    const translate = $filter('translate');

    $controller('DetailController', {
      $scope: $scope,
      item: topic
    });

    const addLesson = (lesson) => {
      const [org, repo] = lesson.slug.split('/');
      return Api.getGuide({ org, repo }).tap((guide) => {
        $scope.item.addLesson(guide)
        $scope.$apply();
      });
    };

    $scope.guides = guides;

    $scope.Guide = Guide;

    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasGuide = (guide) => !_.some($scope.item.lessons, { id: guide.id });

    $scope._save = () => {
      return Promise.resolve($scope.item)
        .call('toSave')
        .tap((item) => Api.saveTopic(item))
        .tap((item) => CurrentItem.setStored(item))
        .tap((item) => toastr.success(translate('topic_saved_successfully')));
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

  });
