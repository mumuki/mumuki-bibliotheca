
editorTest('Breadcrumb Service', (mocks) => {

  context('on start it has only one crumb', () => {

    beforeEach(inject((_$state_) => {
      sinon.stub(_$state_, 'includes', (state) => state === 'editor');
    }));

    spec((Breadcrumb) => Breadcrumb.list().length.should.be.eql(1));
    spec((Breadcrumb) => Breadcrumb.list().should.be.eql([{ name: 'editor', state: 'editor' }]));

    afterEach(inject((_$state_) => {
      _$state_.includes.restore();
    }));

  });

  context('on navigation it is called with correct arguments', () => {

    beforeEach(inject((_$state_) => {
      mocks.state = sinon.mock(_$state_);
      mocks.state
        .expects('go')
        .once()
        .withExactArgs('editor')
    }));

    spec((Breadcrumb) => Breadcrumb.go('editor'));
  });

});

