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
    beforeSpec(() => mocks.GuideSaver.expects('save').once().withArgs(guide).returns(Promise.resolve()));

    specAsync((done) => () => $scope.save().then(done, done));
  });

});
