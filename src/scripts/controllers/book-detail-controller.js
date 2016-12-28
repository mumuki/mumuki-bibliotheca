angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $sce,
                                                $filter,
                                                $controller,
                                                book,
                                                guides,
                                                topics,
                                                toastr,
                                                Guide,
                                                Api,
                                                CurrentItem) {

    const translate = $filter('translate');

    $controller('DetailController', {
      $scope: $scope,
      item: book
    });

    const addChapter = (chapter) => {
      const [org, repo] = chapter.slug.split('/');
      return Api.getTopic({ org, repo }).tap((topic) => {
        return Api
          .renderMarkdown(topic.description.split('\n')[0].trim())
          .then((html) => topic.description = html)
          .then(() => $scope.item.addChapter(topic))
          .then(() => $scope.$apply());
      });
    };

    $scope.guides = guides;
    $scope.topics = topics;

    $scope.Guide = Guide;

    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasTopic = (topic) => !_.some($scope.item.chapters, { id: topic.id });
    $scope.hasGuide = (guide) => !_.includes($scope.item.complements, guide.slug);

    $scope.save = () => {
      return $scope.publish('book');
    };

    let _chapterSelected;
    let _complementSelected;

    $scope.selected = {
      get chapter() {
        return _chapterSelected;
      },
      set chapter(topic) {
        addChapter(topic);
      },
      get complement() {
        return _complementSelected;
      },
      set complement(topic) {
        $scope.item.addComplement(topic.slug);
      }
    }

    $scope.complements = () => _.map($scope.item.complements, toGuide)

    const toGuide = (slug) => {
      return _.find(guides, { slug: slug });
    }

  });
