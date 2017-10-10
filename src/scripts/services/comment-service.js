angular
  .module('editor')
  .service('Comment', function() {

    this._comment_types = {
      cpp: { start: '/*', end: '*/' },
      ruby: { start: '#', end: '#' },
      haskell: { start: '{-', end: '-}' }
    }

    this.from = (type = 'cpp') => {
      return this._comment_types[type];
    }

  });
