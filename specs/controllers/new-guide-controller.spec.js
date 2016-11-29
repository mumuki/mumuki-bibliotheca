editorTest('New Guide Controller', (mocks) => {

  const params = { org: 'foo', repo: 'bar' };

  let $scope;
  let guide = {
    params: () => params,
  };

  beforeSpec((_$rootScope_) => $scope = _$rootScope_.$new());
  beforeSpec((_$controller_) => _$controller_('NewGuideController', { $scope, guide }));

  context('#isNew', () => {
    spec(() => $scope.isNew.should.be.true);
  });

  context('#save', () => {
    beforeSpec((_GuideSaver_) => mocks.GuideSaver = sinon.mock(_GuideSaver_));
    beforeSpec((_$state_) => mocks.state = sinon.mock(_$state_));
    beforeSpec(() => mocks.GuideSaver.expects('save').once().withExactArgs(guide).returns(Promise.resolve()));
    beforeSpec(() => mocks.state.expects('go').once().withExactArgs('editor.home.guides.detail', params));

    specAsync((done) => () => $scope.save().then(done, done));
  });

});
