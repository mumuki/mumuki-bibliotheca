angular
  .module('editor')
  .factory('Guide', function ($injector,
                              Exercise,
                              Validator,
                              GuideTypes,
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

      addExercise() {
        const maxExercise = _.maxBy(this.exercises, 'id') || { id: 0 };
        const exercise = Exercise.from({ id: maxExercise.id + 1 });
        this.exercises.push(exercise);
        return exercise;
      }

      setLocale(locale) {
        this.locale = locale;
      }

      setLanguage(language) {
        this.language = language;
      }

      setType(type) {
        this.type = type;
      }

      getType() {
        return GuideTypes.fromName(this.type);
      }

      getExercise(id) {
        return _.find(this.exercises, { id: parseInt(id, 10) });
      }

      toSave() {
        this.validate();
        this.createSlug();
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

      createSlug() {
        if (!_.isEmpty(this.slug)) {
          Validator.notEmptyString(this, 'slug');
          return this.slug;
        }
        const translate = $injector.get('$translate')
        const translationTable = translate.getTranslationTable(this.locale);
        const guideTranslated = _.deburr(translationTable.guide.toLowerCase());
        const kebabCase = _.kebabCase(this.name);
        const slug = {
          repo: `mumuki-${guideTranslated}-${this.language}-${kebabCase}`,
          org: CurrentGuide.getOrganization(),
          fullName: () => `${slug.org}/${slug.repo}`,
        }
        Validator.notEmptyString(slug, 'org');
        Validator.notEmptyString(slug, 'repo');
        this.slug = slug.fullName();
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

    }

    return Guide;

  });
