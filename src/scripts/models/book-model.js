angular
  .module('editor')
  .factory('Book', function($injector,
                            Slug,
                            Validator,
                            CurrentItem) {

    class Book {

      constructor(book) {
        _.defaultsDeep(this, book);
      }

      icon() {
        return `fa fa-${Book.canonicalIcon()}`;
      }

      fullName() {
        return this.name;
      }

      params() {
        const [org, repo] = this.slug.split('/');
        return { org, repo };
      }

      getItem() {
        const book = Book.from(_.cloneDeep(this));
        book.chapters = _.map(book.chapters, (chapter) => chapter.slug)
        return book;
      }

      setLocale(locale) {
        this.locale = locale;
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

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'locale');
        Validator.notEmptyString(this, 'description');
      }

      canSave() {
        try {
          this.validate();
          return CurrentItem.hasChanges(this.getItem());
        } catch(_) {
          return false;
        }
      }

      contentSummary() {
        return _.map(this.chapters, (chapter) => chapter.name).join(", ");
      }

      static from(book = {}) {
        _.defaultsDeep(book, {
          locale: $injector.get('$translate').use(),
          chapters: [],
          complements: [],
        });
        return new Book(book);
      }

      static sortBy() {
        return ['slug'];
      }

      static canonicalIcon() {
        return 'book';
      }
    }

    return Book;

  });
