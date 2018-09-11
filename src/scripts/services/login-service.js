angular
  .module('editor')
  .service('Login', function (CONFIG) {

    const LABO = CONFIG.laboratory.url;

    this.params = () => `?origin=${encodeURIComponent(document.location.href)}&organization=base`;
    this.getLoginUrl = () =>  `${LABO}/login${this.params()}`;
    this.getLogoutUrl = () =>  `${LABO}/logout${this.params()}`;

  });
