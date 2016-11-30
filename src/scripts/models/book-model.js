angular
  .module('editor')
  .factory('Book', function () {

    class Book {

      constructor(book) {
        _.defaultsDeep(this, book);
      }

      icon() {
        return 'fa-book';
      }

      fullName() {
        return this.name;
      }

      params() {
        const [org, repo] = this.slug.split('/');
        return { org, repo };
      }

      static from(book = {}) {
        return new Book(book);
      }

      static sortBy() {
        return ['slug'];
      }

    }

    return Book;

  });
