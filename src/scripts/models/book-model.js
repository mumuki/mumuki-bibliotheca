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

      toSave() {
        const book = _.cloneDeep(this);
        book.chapters = _.map(book.chapters, (chapter) => chapter.slug)
        return book;
      }

      addChapter(chapter) {
        this.chapters.push(chapter);
      }

      removeChapter(chapter) {
        _.remove(this.chapters, { id: chapter.id });
      }

      addComplement(complement) {
        this.complements.push(complement);
      }

      removeComplement(index) {
        this.complements.splice(index, 1);
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
