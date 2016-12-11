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
    beforeSpec(() => mocks.scope = sinon.mock($scope));
    beforeSpec(() => mocks.scope.expects('publish').once().withArgs('guide').returns(Promise.resolve()));

    specAsync((done) => () => $scope.save().then(done, done));
  });

});
