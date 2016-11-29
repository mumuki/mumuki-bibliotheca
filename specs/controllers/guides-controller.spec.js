editorTest('Guides Controller', (mocks) => {

  let $scope = {}

  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }]));
  beforeSpec((_$controller_) => _$controller_('GuidesController', { $scope: $scope, guides: [] }));

  context('#open', () => {

    beforeSpec((_$state_) => {
      mocks.state = sinon.mock(_$state_);
      mocks.state.expects('go').once().withExactArgs('editor.home.guides.detail', { org: 'foo', repo: 'bar'});
    });

    spec((_Guide_) => $scope.open(_Guide_.from({ slug: 'foo/bar' })));

  });

});
