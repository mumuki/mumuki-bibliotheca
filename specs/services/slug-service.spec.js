
editorTest('Slug Service', (mocks) => {

  let Slug;
  let Guide;
  let guide;

  beforeSpec((_Slug_) => Slug = _Slug_);
  beforeSpec((_Guide_) => Guide = _Guide_);
  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }, { name: 'text' }]));

  context('#create', () => {

    context('when guide already has a slug', () => {
      spec(() => expect(() => Slug.create(Guide.from({ slug: '' }), 'guide')).to.throw());
      spec(() => expect(() => Slug.create(Guide.from({ slug: 'foo/bar' }), 'guide')).to.not.throw());
    });

    context('when guide has not a slug', () => {

      beforeSpec(() => guide = Guide.from({ name: 'túrn Döwn🚧🚧Fòr What', language: 'haskell' }));

      context('and organization is set', () => {
        beforeSpec((_CurrentItem_) => _CurrentItem_.setOrganization('Foo'));
        beforeSpec(() => Slug.create(guide, 'guide'));

        spec(() => guide.slug.should.be.eql('foo/mumuki-guide-haskell-turn-down-for-what'));
      });

      context('and organization is not set', () => {
        spec(() => expect(() => Slug.create(guide, 'guide')).to.throw());
      });

    });

  });



});

