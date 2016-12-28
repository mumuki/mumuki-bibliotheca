
editorTest('Permissions Service', (mocks) => {

  let Permissions;

  beforeSpec((_Permissions_) => Permissions = _Permissions_);

  context('#organizations', () => {

    beforeSpec(() => Permissions.set({ writer: 'foo/bar:example/*', editor: 'test/foo:foo/baz', owner: '*' }));

    spec(() => Permissions.organizations().should.be.eql(['foo', 'example', 'test']));

  });

  context('#hasPermission', () => {

    beforeSpec(() => Permissions.set({ writer: 'foo/bar:example/*', editor: 'bar/foo:foo/baz', owner: '*' }));

    spec(() => Permissions.hasPermission('writer', 'example').should.be.eql(true));
    spec(() => Permissions.hasPermission('writer', 'foo/bar').should.be.eql(true));
    spec(() => Permissions.hasPermission('writer', 'foo/baz').should.be.eql(false));

    spec(() => Permissions.hasPermission('editor', 'bar/foo').should.be.eql(true));
    spec(() => Permissions.hasPermission('editor', 'foo/baz').should.be.eql(true));
    spec(() => Permissions.hasPermission('editor', 'example').should.be.eql(false));

    spec(() => Permissions.hasPermission('owner', 'bar/foo').should.be.eql(true));
    spec(() => Permissions.hasPermission('owner', 'foo/baz').should.be.eql(true));
    spec(() => Permissions.hasPermission('owner', 'example').should.be.eql(true));

  });

  context('#permissions', () => {

    beforeSpec(() => Permissions.set({ writer: 'foo/bar:example/*', editor: 'bar/foo:foo/baz', owner: '*' }));

    spec(() => Permissions.writerPermissions('writer').should.be.eql('foo/bar:example/*'));
    spec(() => Permissions.editorPermissions('editor').should.be.eql('bar/foo:foo/baz'));
    spec(() => Permissions.ownerPermissions('owner').should.be.eql('*'));
  });

  context('#is', () => {

    beforeSpec(() => Permissions.set({ writer: 'foo/bar:example/*', editor: 'bar/foo:foo/baz', owner: 'foo/*' }));

    spec(() => Permissions.isWriter('foo').should.be.eql(true));
    spec(() => Permissions.isEditor('foo').should.be.eql(true));
    spec(() => Permissions.isOwner('foo').should.be.eql(true));

    spec(() => Permissions.isWriter('example').should.be.eql(true));
    spec(() => Permissions.isEditor('example').should.be.eql(false));
    spec(() => Permissions.isOwner('example').should.be.eql(false));

    spec(() => Permissions.isWriter('bar/foo').should.be.eql(true));
    spec(() => Permissions.isEditor('bar/foo').should.be.eql(true));
    spec(() => Permissions.isOwner('bar/foo').should.be.eql(false));
    spec(() => Permissions.isOwner('foo').should.be.eql(true));
  });

  context('#isSuperUser', () => {

    spec(() => {
      Permissions.set({ editor: '*' });
      Permissions.isSuperUser().should.be.eql(false);
    });

    spec(() => {
      Permissions.set({ owner: '' });
      Permissions.isSuperUser().should.be.eql(false);
    });

    spec(() => {
      Permissions.set({ owner: 'foo/bar' });
      Permissions.isSuperUser().should.be.eql(false);
    });

    spec(() => {
      Permissions.set({ owner: 'foo/*' });
      Permissions.isSuperUser().should.be.eql(false);
    });

    spec(() => {
      Permissions.set({ owner: '*/*' });
      Permissions.isSuperUser().should.be.eql(true);
    });

    spec(() => {
      Permissions.set({ owner: '*' });
      Permissions.isSuperUser().should.be.eql(true);
    });

  });

});

