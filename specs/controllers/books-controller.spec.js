editorTest('Books Controller', (mocks) => {

  let $scope = {}

  beforeSpec((_$controller_) => _$controller_('BooksController', { $scope: $scope, books: [] }));

  context('#open', () => {

    beforeSpec((_$state_) => {
      mocks.state = sinon.mock(_$state_);
      mocks.state.expects('go').once().withExactArgs('editor.home.books.detail', { org: 'foo', repo: 'bar'});
    });

    spec((_Book_) => $scope.open(_Book_.from({ slug: 'foo/bar' })));

  });

  context('#newState', () => {
    spec(() => $scope.newState.should.be.eql('editor.home.books.new'));
  });

});
