angular
  .module('editor')
  .factory('Guide', function (Exercise,
                              Validator,
                              CurrentGuide) {

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
        return _.find(this.exercises, { id: parseInt(id, 10) });
      }

      toSave() {
        this.validate();
        return this;
      }

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'type');
        Validator.notEmptyString(this, 'locale');
        Validator.notEmptyString(this, 'authors');
        Validator.notEmptyString(this, 'language');
        Validator.notEmptyString(this, 'description');
        this.validateExercises();
      }

      validateExercises() {
        this.exercises.forEach((exercise) => exercise.validate());
      }

      canSave() {
        try {
          this.validate();
          return CurrentGuide.hasChanges(this);
        } catch(_) {
          return false;
        }
      }

      static from(guide = {}) {
        _.defaultsDeep(guide, {
          type: 'problem',
          locale: 'es',
          language: 'text',
          exercises: [],
        });
        guide.exercises = guide.exercises.map(Exercise.from);
        return new Guide(guide);
      }

      static sortBy() {
        return ['language', 'fullName()'];
      }

    }

    return Guide;

  });
