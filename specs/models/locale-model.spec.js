
editorTest('Locale Model', () => {

  let Locale;

  beforeSpec((_Locale_) => Locale = _Locale_);

  context('#icon', () => {
    spec(() => Locale.from({ code: 'en' }).icon().should.be.eql('flag-icon flag-icon-gb'));
    spec(() => Locale.from({ code: 'es' }).icon().should.be.eql('flag-icon flag-icon-ar'));
  });

  context('#sortBy', () => {
    spec(() => Locale.sortBy().should.be.an.Array);
    spec(() => Locale.sortBy().length.should.be.eql(2));
    spec(() => Locale.sortBy().should.be.eql(['code', 'name']));
  });

});

