
editorTest('Breadcrumb Service', (mocks) => {

  context('on start it has only one crumb', () => {

    beforeSpec((_$state_) => {
      sinon.stub(_$state_, 'includes', (state) => state === 'editor');
    });

    spec((Breadcrumb) => Breadcrumb.list().length.should.be.eql(1));

    afterSpec((_$state_) => {
      _$state_.includes.restore();
    });

  });

  context('on navigation it is called with correct arguments', () => {

    beforeSpec((_$state_) => {
      mocks.state = sinon.mock(_$state_);
      mocks.state
        .expects('go')
        .once()
        .withExactArgs('editor', {});
    });

    spec((Breadcrumb) => Breadcrumb.go('editor'));
  });

});

