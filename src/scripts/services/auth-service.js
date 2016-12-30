angular
  .module('editor')
  .service('Auth', function($injector,
                            $state,
                            $translate,
                            auth,
                            store,
                            jwtHelper,
                            Permissions) {

    const updatePermissions = (callback = () => {}) => {
      $injector.get('Api')
        .getPermissions()
        .then((permissions) => Permissions.set(permissions))
        .then(() => callback())
    }

    this.isSuperUser = () => {
      return Permissions.isSuperUser();
    }

    this.profile = () => {
      return store.get('profile');
    }

    this.token = () => {
      return store.get('token');
    }

    this.organizations = () => {
      return Permissions.organizations();
    }

    this.signin = (callback) => {
      const authConfig = {
        dict: $translate.use(),
        icon: '/images/icon.png',
        authParams: { scope: 'openid email' }
      }
      auth.signin(authConfig, (profile, token) => {
        store.set('profile', profile);
        store.set('token', token);
        updatePermissions(callback);
      });
    };

    this.signout = () => {
      auth.signout();
      store.remove('token');
      store.remove('profile');
      $state.go('editor.login', {}, { reload: true });
    };

    this.isLoggedIn = () => {
      return auth.isAuthenticated;
    };

    this.isTokenExpired = () => {
      return _.isEmpty(this.token()) || jwtHelper.isTokenExpired(this.token());
    };

    this.authenticate = () => {
      auth.authenticate(this.profile(), this.token());
    };

    this.authenticateIfPossible = () => {
      if(!this.isTokenExpired() && !this.isLoggedIn()) {
        this.authenticate();
      }
    }

  });
