angular
  .module('editor')
  .constant('CONFIG', {

    bibliotheca: {
      url: 'http://bibliotheca.localmumuki.io:9292'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_bibliotheca_session',
      regular: 'mucookie'
    }
  });
