angular
  .module('editor')
  .factory('Language', function($filter) {

    const $translate = $filter('translate');

    class Language {

      constructor(language) {
        _.merge(this, language);
      }

      icon() {
        return `da da-${this.devicon || this.name}`;
      }

      testTemplate() {
        return _.chain(this)
          .get('test_template', '')
          .replace(/{{\W*test_template_.*_description\W*}}/g, (description) => {
            return $translate(description.match(/(test_template_.*_description)/)[1])
          })
          .value();
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
