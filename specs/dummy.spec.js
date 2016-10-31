
editorTest('Dummy', () => {

  context('boolean dummy spec', () => {
    spec(() => true.should.be.eql(true));
    spec(() => false.should.be.eql(false));
    spec(() => false.should.not.be.eql(true));
  })

});
