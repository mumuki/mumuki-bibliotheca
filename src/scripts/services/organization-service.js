angular
  .module('editor')
  .service('Organization', function ($injector, $rootScope) {
    this.set = (org) => {
      this.organization = org;
      $rootScope.customJsUrl = org.extension_javascript_url;
      $rootScope.customCssUrl = org.theme_stylesheet_url;
    };

    this.load = () => {
      return this.organization
        ? Promise.resolve(this.organization)
        : $injector.get('Api').getOrganization().then(this.set);
    }
  });
