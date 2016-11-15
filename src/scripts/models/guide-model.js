angular
  .module('editor')
  .factory('Guide', function() {

    class Guide {

      constructor(guide) {
        _.defaultsDeep(this, guide);
      }

      icon() {
        return this.language;
      }

      fullName() {
        return this.name;
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
