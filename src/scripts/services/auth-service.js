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

    let profile;

    const updatePermissions = (callback = () => {}) => {
      $injector.get('Api')
        .getPermissions()
        .then((permissions) => Permissions.set(permissions))
        .then(() => callback());
    };

    this.isSuperUser = () => {
      return Permissions.isSuperUser();
    };

    this.profile = () => {
      return profile;
    };

    this.token = () => {
      return $cookies.get(CONFIG.cookie.name);
    };

    this.organizations = () => {
      return Permissions.organizations();
    };

    this.signin = (callback) => {
      document.location.href = $injector.get('Api').getLoginUrl();
    };

    this.signout = () => {
      store.remove('token');
      document.location.href = $injector.get('Api').getLogoutUrl();
    };

    this.isLoggedIn = () => {
      return !this.isTokenExpired();
    };

    this.isTokenExpired = () => {
      return _.isEmpty(this.token()) || jwtHelper.isTokenExpired(this.token());
    };

    this.authenticateIfPossible = () => {
      if(this.isLoggedIn()) {
        profile = jwtHelper.decodeToken(this.token()).metadata;
        // TODO: sacar este picture (está de prueba únicamente)
        profile.picture = 'https://pbs.twimg.com/profile_images/378800000515605146/dabda3943bac1225ec56d5aa396e23ed.jpeg';
      }
    };

  });
