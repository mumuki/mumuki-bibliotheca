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
      return JSON.parse($cookies.get('mucookie'));
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
      return false;
      // return _.isEmpty(this.token()) || jwtHelper.isTokenExpired(this.token());
    };

    this.authenticateIfPossible = () => {
      if(this.isLoggedIn()) {
      }
    };

  });
