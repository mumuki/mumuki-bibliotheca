angular
  .module('editor')
  .factory('Language', function($filter, $rootScope) {

    const $translate = $filter('translate');

    class Language {

      constructor(language) {
        _.merge(this, language);
      }

      icon() {
        return `da da-${this.devicon || this.name}`;
      }

      setLayoutAssets(){
        $rootScope.language_layout_css_urls = this.layout_css_urls;
        $rootScope.language_layout_html_urls = this.layout_html_urls;
        $rootScope.language_layout_js_urls = this.layout_js_urls;
      }

      setEditorAssets(){
        $rootScope.language_editor_css_urls = this.editor_css_urls;
        $rootScope.language_editor_html_urls = this.editor_html_urls;
        $rootScope.language_editor_js_urls = this.editor_js_urls;
      }

      getCustomEditorHtml(){
        const editor_tag = `mu-${this.name}-custom-editor`;
        return `<${editor_tag}> </${editor_tag}>`
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
