
editorTest('Book Model', () => {

  let book;
  let Book;

  beforeSpec((_Book_) => Book = _Book_);
  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }, { name: 'text' }]));

  context('#icon', () => {
    spec(() => Book.from({}).icon().should.be.eql('fa fa-book'));
  });

  context('#fullName', () => {
    spec(() => Book.from({ name: 'mumuki example' }).fullName().should.be.eql('mumuki example'));
  });

  context('#params', () => {
    let params;

    beforeSpec(() => params = Book.from({ slug: 'foo/bar' }).params())

    spec(() => params.org.should.be.eql('foo'));
    spec(() => params.repo.should.be.eql('bar'));
  });

  context('#from', () => {
    beforeSpec(() => book = Book.from({}));

    spec(() => book.should.have.property('locale').eql('en'));
    spec(() => book.should.have.property('chapters').eql([]));
    spec(() => book.should.have.property('complements').eql([]));
    spec(() => _.keys(book).length.should.be.eql(3));
  });

  context('#validation', () => {
    beforeSpec(() => book = Book.from({
      name: 'example',
      locale: 'en',
      description: 'description',
    }));

    spec(() => expect(() => book.validate()).to.not.throw());
    spec(() => expect(() => _.omit(book, 'name').validate()).to.throw());
    spec(() => expect(() => _.omit(book, 'locale').validate()).to.throw());
    spec(() => expect(() => _.omit(book, 'description').validate()).to.throw());
  });

  context('#sortBy', () => {
    spec(() => Book.sortBy().should.be.an.Array);
    spec(() => Book.sortBy().length.should.be.eql(1));
    spec(() => Book.sortBy().should.be.eql(['slug']));
  });

});

