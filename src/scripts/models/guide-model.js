angular
  .module('editor')
  .factory('Guide', function(Exercise) {

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

      getExercise(id) {
        return Exercise.from(_.find(this.exercises, { id: parseInt(id, 10) }));
      }

      toSave() {
        this.validate();
        return this;
      }

      validate() {

      }

      static from(guide = {}) {
        guide.exercises = _.get(guide, 'exercises', []).map(Exercise.from);
        return new Guide(guide);
      }

      static sortBy() {
        return ['language', 'fullName()'];
      }

    }

    return Guide;

  });
