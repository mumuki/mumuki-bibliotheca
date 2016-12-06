
editorTest('Topic Model', () => {

  let topic;
  let Topic;

  beforeSpec((_Topic_) => Topic = _Topic_);
  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }, { name: 'text' }]));

  context('#icon', () => {
    spec(() => Topic.from({}).icon().should.be.eql('fa fa-commenting'));
  });

  context('#fullName', () => {
    spec(() => Topic.from({ name: 'mumuki example' }).fullName().should.be.eql('mumuki example'));
  });

  context('#params', () => {
    let params;

    beforeSpec(() => params = Topic.from({ slug: 'foo/bar' }).params());

    spec(() => params.org.should.be.eql('foo'));
    spec(() => params.repo.should.be.eql('bar'));
  });

  context('#from', () => {
    beforeSpec(() => topic = Topic.from({}));

    spec(() => topic.should.have.property('locale').eql('en'));
    spec(() => topic.should.have.property('lessons').eql([]));
    spec(() => _.keys(topic).length.should.be.eql(2));
  });

  context('#validation', () => {
    beforeSpec(() => topic = Topic.from({
      name: 'example',
      locale: 'en',
      description: 'description',
    }));

    spec(() => expect(() => topic.validate()).to.not.throw());
    spec(() => expect(() => _.omit(topic, 'name').validate()).to.throw());
    spec(() => expect(() => _.omit(topic, 'locale').validate()).to.throw());
    spec(() => expect(() => _.omit(topic, 'description').validate()).to.throw());
  });

  context('#sortBy', () => {
    spec(() => Topic.sortBy().should.be.an.Array);
    spec(() => Topic.sortBy().length.should.be.eql(1));
    spec(() => Topic.sortBy().should.be.eql(['slug']));
  });

});

