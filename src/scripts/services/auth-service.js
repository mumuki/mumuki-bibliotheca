angular
  .module('editor')
  .service('Auth', function($state,
                            $translate,
                            auth,
                            store,
                            jwtHelper) {

    this.profile = () => {
      return store.get('profile');
    }

    this.token = () => {
      return store.get('token');
    }

    this.signin = (callback) => {
      const authConfig = {
        dict: $translate.use(),
        icon: '/images/icon.png',
        authParams: { scope: 'openid app_metadata' }
      }
      auth.signin(authConfig, (profile, token) => {
        store.set('profile', profile);
        store.set('token', token);
        if (_.isFunction(callback)) callback(profile);
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
