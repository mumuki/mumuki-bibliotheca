angular
  .module('editor')
  .factory('Locale', function() {

    const flagCode = (code) => {
      return { es: 'ar', en: 'gb' }[code];
    }

    class Locale {

      constructor(locale) {
        _.defaultsDeep(this, locale);
      }

      icon() {
        return `flag-icon flag-icon-${flagCode(this.code)}`;
      }

      static from(locale = {}) {
        return new Locale(locale);
      }

      static sortBy() {
        return ['code', 'name'];
      }

    }

    return Locale;

  });
