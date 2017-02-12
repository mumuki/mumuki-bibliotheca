angular
  .module('editor')
  .service('Auth', function($injector,
                            $state,
                            $cookies,
                            CONFIG,
                            $translate,
                            store,
                            jwtHelper,
                            Permissions) {
    let profile = null;

    const updatePermissions = (callback = () => {}) => {
      $injector.get('Api')
        .getPermissions()
        .then((permissions) => Permissions.set(permissions))
        .then(() => callback());
    };

    this.isSuperUser = () => {
      return Permissions.isSuperUser();
    };

    this.organizations = () => {
      return Permissions.organizations();
    };

    this.signin = (callback) => {
      document.location.href = $injector.get('Api').getLoginUrl();
    };

    this.signout = () => {
      store.remove('token');
      profile = null;
      document.location.href = $injector.get('Api').getLogoutUrl();
    };

    this.checkProfile = () => {
      let encodedProfile = $cookies.get('mucookie_profile');
      if (encodedProfile) {
        profile = JSON.parse(atob(encodedProfile));
      }
    };

    this.profile = () => profile;

    this.isLoggedIn = () => {
      if (profile === null) {
        this.checkProfile()
      }
      return profile !== null;
    };

    this.authenticateIfPossible = () => {
      if(this.isLoggedIn()) {
      }
    };

  });
