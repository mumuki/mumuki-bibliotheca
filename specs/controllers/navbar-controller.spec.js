editorTest('Navbar Controller', (mocks) => {

  let $scope = {}

  beforeSpec((_$controller_) => {
    _$controller_('NavbarController', { $scope });
  });

  context('#login', () => {

    beforeSpec((_$state_, _auth_) => {
      sinon.stub(_auth_, 'signin', (_, callback) => callback());
      mocks.state = sinon.mock(_$state_);
      mocks.state.expects('go').once().withExactArgs('editor.login', {}, { reload: true });
    });

    spec(() => $scope.login());

    afterSpec((_auth_) => _auth_.signin.restore());

  });

});
