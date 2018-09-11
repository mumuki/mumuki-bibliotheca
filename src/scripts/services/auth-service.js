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

    const updatePermissions = () => {
      $injector.get('Api')
        .getPermissions()
        .then((permissions) => Permissions.set(permissions))
    };

    this.isWriterInAnyOrganization = () => {
      return Permissions.isWriterInAnyOrganization();
    };

    this.organizations = () => {
      return Permissions.organizations();
    };

    this.signin = (callback) => {
      document.location.href = $injector.get('Login').getLoginUrl();
    };

    this.signout = () => {
      profile = null;
      store.remove('permissions');
      document.location.href = $injector.get('Login').getLogoutUrl();
    };

    this.checkProfile = () => {
      let encodedProfile = $cookies.get('mucookie_profile');
      if (encodedProfile) {
        profile = JSON.parse(atob(encodedProfile));
      }
    };

    this.profile = () => profile;

    this.imageUrl = () => {
      const image = this.profile().user_image_url;
      return _.startsWith(image, 'http') ? image : 'assets/user_shape.png';
    }

    this.isLoggedIn = () => {
      if (profile === null) {
        this.checkProfile()
      }
      return profile !== null;
    };

    // I think this method is obsolete now
    this.authenticateIfPossible = () => {
      if(this.isLoggedIn()) {
        if(Permissions.isEmpty()) {
          updatePermissions();
        }
      }
    };

  });
