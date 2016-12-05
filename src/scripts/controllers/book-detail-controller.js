angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $sce,
                                                book,
                                                toastr,
                                                topics,
                                                Api,
                                                CurrentItem,
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

    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasTopic = (topic) => {
      return !_.some($scope.book.chapters, { id: topic.id })
          && !_.includes($scope.book.complements, topic.slug);
    };

    $scope.save = () => {
      return Promise.resolve($scope.book)
        .call('toSave')
        .tap((book) => Api.saveBook())
        .tap((book) => CurrentItem.setStored(book))
        .then(() => toastr.success(translate('book_saved_successfully')))
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    };

    let _chapterSelected;
    let _complementSelected;

    $scope.selected = {
      get chapter() {
        return _chapterSelected;
      },
      set chapter(topic) {
        _chapterSelected = topic;
        addChapter(topic);
      },
      get complement() {
        return _complementSelected;
      },
      set complement(topic) {
        _complementSelected = topic;
        $scope.book.addComplement(topic.slug);
      }
    }

    Hotkeys.bindSave($scope);

  });
