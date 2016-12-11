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

    $scope.save = () => {
      return $scope.publish('topic');
    };

    $scope.exerciseParams = (lesson, exercise) => {
      return _.merge({ eid: exercise.id }, lesson.params());
    }

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
