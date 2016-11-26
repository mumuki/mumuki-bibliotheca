angular
  .module('editor')
  .service('Debounce', function () {

    this.for = (callback) => _.debounce(callback, 1500, {
      leading: true,
      trailing: false
    });

  });
