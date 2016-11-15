angular
  .module('editor')
  .factory('Guide', function() {

    class Guide {

      constructor(guide) {
        _.defaultsDeep(this, guide);
      }

      icon() {
        return `da-${this.language}`;
      }

      fullName() {
        return this.name;
      }

      params() {
        const [org, repo] = this.slug.split('/');
        return { org, repo };
      }

      setLocale(locale) {
        this.locale = locale;
      }

      setLanguage(language) {
        this.language = language;
      }

      static from(guide = {}) {
        return new Guide(guide);
      }

      static sortBy() {
        return ['language', 'fullName()'];
      }

    }

    return Guide;

  });
