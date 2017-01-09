angular
  .module('editor')
  .constant('CONFIG', {

    bibliotheca: {
      url: '<MUMUKI_BIBLIOTHECA_URL>'
    },

    auth: {
      domain: '<MUMUKI_AUTH0_DOMAIN>',
      clientID: '<MUMUKI_AUTH0_CLIENT_ID>'
    }

  });
