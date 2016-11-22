angular
  .module('editor')
  .service('CurrentGuide', function () {

    let _guide;

    this.set = (guide) => {
      _guide = guide;
    }

    this.get = () => {
      return _guide;
    }

  });
