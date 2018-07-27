angular
  .module('editor')
  .controller('BookDetailController', function ($scope,
                                                $state,
                                                $sce,
                                                $stateParams,
                                                $filter,
                                                $controller,
                                                book,
                                                guides,
                                                topics,
                                                toastr,
                                                Guide,
                                                Modal,
                                                Api) {

    const translate = $filter('translate');

    $controller('DetailController', {
      $scope: $scope,
      item: book
    });

    const addChapter = (chapter) => {
      $scope.showSpinner();
      const [org, repo] = chapter.slug.split('/');
      return Api.getTopic({org, repo}).tap((topic) => {
        return Api
          .renderMarkdown(topic.description.split('\n')[0].trim())
          .then((html) => topic.description = html)
          .then(() => $scope.item.addChapter(topic))
          .then(() => $scope.$apply(() => $scope.hideSpinner()));
      });
    };

    $scope.guides = guides;
    $scope.topics = topics;

    $scope.Guide = Guide;

    $scope.html = (html) => $sce.trustAsHtml(html);
    $scope.hasTopic = (topic) => !_.some($scope.item.chapters, {id: topic.id});
    $scope.hasGuide = (guide) => !_.includes($scope.item.complements, guide.slug);

    $scope.save = () => {
      return $scope.publish('book');
    };

    $scope.fork = (book) => {
      Modal.forkFromGithub(translate('copy_book'), translate('copy_book_text'), (organization) => {
        return Api
          .forkBook($stateParams, organization)
          .then(() => $state.go('editor.home.books.detail', { org: organization, repo: $stateParams.repo }, {reload: true}))
          .then(() => toastr.success(translate('book_forked_successfully', { fullName: book.name })))
          .catch((response) => {
            return (response.status == 400) ?
              toastr.error(translate('book_already_exists', { fullName: book.name })) :
              toastr.error(translate('book_fork_fails'));
          })
      });
    }

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
    };

    $scope.complements = () => _.map($scope.item.complements, toGuide);

    const toGuide = (slug) => {
      return _.find(guides, {slug: slug});
    };

  });
