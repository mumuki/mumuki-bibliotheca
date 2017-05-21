angular
  .module('editor')
  .constant('CONFIG', {

    bibliotheca: {
      url: 'http://localhost:3004'
    },

    cookie: {
      domain: 'localhost',
      session: '_mumuki_bibliotheca_session'
    }
  });
