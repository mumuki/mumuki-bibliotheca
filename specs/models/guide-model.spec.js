
editorTest('Guide Model', () => {

  let guide;
  let Guide;

  beforeSpec((_Guide_) => Guide = _Guide_);
  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }, { name: 'text' }]));

  context('#icon', () => {
    spec(() => Guide.from({ language: 'haskell' }).icon().should.be.eql('da da-haskell'));
  });

  context('#fullName', () => {
    spec(() => Guide.from({ name: 'mumuki example' }).fullName().should.be.eql('mumuki example'));
  });

  context('#params', () => {
    let params;

    beforeSpec(() => params = Guide.from({ slug: 'foo/bar' }).params())

    spec(() => params.org.should.be.eql('foo'));
    spec(() => params.repo.should.be.eql('bar'));
  });

  context('#getExercise', () => {
    const exercise1 = { id: 1 };
    const exercise2 = { id: 2, test: '' };
    const exercise3 = { id: 3 };
    const exercises = [exercise1, exercise2, exercise3];

    spec(() => Guide.from({exercises: exercises}).getExercise(2).should.be.eql(exercise2));
  });

  context('#from', () => {
    beforeSpec(() => guide = Guide.from({}));

    spec(() => guide.should.have.property('type').eql('learning'));
    spec(() => guide.should.have.property('locale').eql('en'));
    spec(() => guide.should.have.property('language').eql(undefined));
    spec(() => guide.should.have.property('exercises').eql([]));
    spec(() => _.keys(guide).length.should.be.eql(4));
  });

  context('#validation', () => {
    beforeSpec(() => guide = Guide.from({
      name: 'example',
      type: 'practice',
      locale: 'en',
      authors: 'authors',
      language: 'haskell',
      description: 'description',
    }));

    spec(() => expect(() => guide.validate()).to.not.throw());
    spec(() => expect(() => _.omit(guide, 'name').validate()).to.throw());
    spec(() => expect(() => _.omit(guide, 'type').validate()).to.throw());
    spec(() => expect(() => _.omit(guide, 'locale').validate()).to.throw());
    spec(() => expect(() => _.omit(guide, 'authors').validate()).to.throw());
    spec(() => expect(() => _.omit(guide, 'language').validate()).to.throw());
    spec(() => expect(() => _.omit(guide, 'description').validate()).to.throw());
  });

  context('#sortBy', () => {
    spec(() => Guide.sortBy().should.be.an.Array);
    spec(() => Guide.sortBy().length.should.be.eql(2));
    spec(() => Guide.sortBy().should.be.eql(['language', 'fullName()']));
  });

});

