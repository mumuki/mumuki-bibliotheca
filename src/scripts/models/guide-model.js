angular
  .module('editor')
  .factory('Guide', function ($injector,
                              Slug,
                              Exercise,
                              Validator,
                              GuideTypes,
                              Languages,
                              CurrentItem) {

    class Guide {

      constructor(guide) {
        _.defaultsDeep(this, guide);
      }

      icon() {
        return this.fullLanguage().icon();
      }

      getAceMode() {
        return this.fullLanguage().highlight_mode;
      }

      fullLanguage() {
        return Languages.fromName(this.language);
      }

      fullName() {
        return this.name;
      }

      params() {
        const [org, repo] = this.slug.split('/');
        return {org, repo};
      }

      canChangeLanguage() {
        return true;
      }

      changeLanguage(language) {
        this.setLanguage(language);
      }

      addExercise() {
        const maxExercise = _.maxBy(this.exercises, 'id') || {id: 0};
        const exercise = Exercise.from({id: maxExercise.id + 1});
        this.exercises.push(exercise);
        return exercise;
      }

      removeExercise(id) {
        _.remove(this.exercises, {id});
      }

      setLocale(locale) {
        this.locale = locale;
      }

      setLanguage(language) {
        Languages.fromName(language).setAssets();
        this.language = language;
      }

      setType(type) {
        this.type = type;
      }

      getType() {
        return GuideTypes.fromName(this.type);
      }

      getExercise(id) {
        return _.find(this.exercises, {id: parseInt(id, 10)});
      }

      moveExerciseTo(index, exercise) {
        _.remove(this.exercises, {id: exercise.id});
        this.exercises.splice(index, 0, Exercise.from(exercise));
      }

      getItem() {
        const guide = Guide.from(_.cloneDeep(this));
        guide.exercises = _.map(guide.exercises, (ex) => ex.getItem());
        return guide;
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
          return CurrentItem.hasChanges(this.getItem());
        } catch (_) {
          return false;
        }
      }

      static from(guide = {}) {
        _.defaultsDeep(guide, {
          type: $injector.get('GuideTypes').default(),
          locale: $injector.get('$translate').use(),
          language: $injector.get('Languages').default(),
          exercises: [],
        });
        guide.exercises = guide.exercises.map(Exercise.from);
        return new Guide(guide);
      }

      static sortBy() {
        return ['language', 'fullName()'];
      }

      static canonicalIcon() {
        return 'map-o';
      }
    }

    return Guide;

  });
