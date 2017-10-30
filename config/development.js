angular
  .module('editor')
  .constant('CONFIG', {

    bibliotheca: {
      url: 'http://0.0.0.0:3004'
    },

    cookie: {
      domain: 'localhost',
      session: '_mumuki_bibliotheca_session'
    }
  });
