angular
  .module('editor')
  .factory('Language', function() {

    class Language {

      constructor(language) {
        _.defaultsDeep(this, language);
      }

      icon() {
        return `da da-${this.name}`;
      }

      static from(language = {}) {
        return new Language(language);
      }

      static sortBy() {
        return ['name'];
      }

    }

    return Language;

  });
