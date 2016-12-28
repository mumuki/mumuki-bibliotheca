angular
  .module('editor')
  .service('Permissions', function ($injector,
                                    store) {

    const PERMISSIONS_KEY = 'permissions';
    const availableScopes = ['writer', 'editor', 'owner'];

    const isWildCard = (org) => org === '*';
    const toOrganizations = (scope) => _.chain(this.get(scope))
                                        .split(':')
                                        .map((grant) => grant.split('/')[0])
                                        .compact()
                                        .value();

    const match = (permission, slug_string) => {
      const Slug = $injector.get('Slug');
      const slug = Slug.parse(slug_string);
      const perm = Slug.parse(permission);
      return perm.allows(slug);
    }

    this.hasPermission = (role, slug_string) => {
      return _.chain(this[`${role}Permissions`]())
              .split(':')
              .some((permission) => match(permission, slug_string))
              .value();
    }


    this.set = (permissions = {}) => {
      store.set(PERMISSIONS_KEY, _.pick(permissions, availableScopes));
    }

    this.get = (role) => {
      return store.get(PERMISSIONS_KEY)[role] || '';
    }


    this.organizations = () => {
      return _.chain(availableScopes)
              .flatMap(toOrganizations)
              .reject(isWildCard)
              .uniq()
              .value();
    }


    this.writerPermissions = () => {
      return this.get('writer');
    };

    this.editorPermissions = () => {
      return this.get('editor');
    };

    this.ownerPermissions = () => {
      return this.get('owner');
    };


    this.isWriter = (slug) => {
      return this.hasPermission('writer', slug) || this.isEditor(slug);
    };

    this.isEditor = (slug) => {
      return this.hasPermission('editor', slug) || this.isOwner(slug);
    };

    this.isOwner = (slug) => {
      return this.hasPermission('owner', slug);
    };

  });
