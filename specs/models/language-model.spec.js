
editorTest('Language Model', () => {

  let Language;

  beforeSpec((_Language_) => Language = _Language_);

  context('#icon', () => {
    spec(() => Language.from({ name: 'foo' }).icon().should.be.eql('da da-foo'));
  });

  context('#sortBy', () => {
    spec(() => Language.sortBy().should.be.an.Array);
    spec(() => Language.sortBy().length.should.be.eql(1));
    spec(() => Language.sortBy()[0].should.be.eql('name'));
  });

});

