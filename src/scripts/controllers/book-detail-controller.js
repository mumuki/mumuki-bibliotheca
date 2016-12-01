angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $sce,
                                                book,
                                                topics,
                                                Api,
                                                Hotkeys) {

    const addChapter = (chapter) => {
      const [org, repo] = chapter.slug.split('/');
      return Api.getTopic({ org, repo }).tap((topic) => {
        return Api
          .renderMarkdown(topic.description.split('\n')[0].trim())
          .then((html) => topic.description = html)
          .then(() => $scope.book.addChapter(topic))
          .then(() => $scope.$apply());
      });
    };

    $scope.book = book;
    $scope.topics = topics;

    $scope.save = () => Api.saveBook($scope.book.toSave());
    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasTopic = (topic) => !_.some($scope.book.chapters, { id: topic.id });

    let _chapterSelected;

    $scope.selected = {
      get chapter() {
        return _chapterSelected;
      },
      set chapter(ch) {
        _chapterSelected = ch;
        addChapter(ch)
      }
    }

    Hotkeys.bindSave($scope);

  });
