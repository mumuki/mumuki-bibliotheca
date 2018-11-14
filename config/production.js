angular
  .module('editor')
  .constant('CONFIG', {

    bibliotheca: {
      url: process.env.MUMUKI_BIBLIOTHECA_API_URL
    },

    laboratory: {
      url: process.env.MUMUKI_LABORATORY_URL
    },

    cookie: {
      domain: process.env.MUMUKI_COOKIES_DOMAIN
    }
  });
