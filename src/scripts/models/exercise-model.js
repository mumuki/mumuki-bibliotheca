angular
  .module('editor')
  .factory('Exercise', function($filter,
                                CurrentItem,
                                Layouts,
                                Editor,
                                Comment,
                                Languages,
                                ExerciseTypes,
                                Validator) {

    const $translate = $filter('translate');

    class Exercise {

      constructor(exercise) {
        _.defaultsDeep(this, exercise);
        this.useTestOrTemplate();
      }

      useTestOrTemplate() {
        this.test = this.hasTest() ? this.test : this.testTemplate();
      }

      resetTestTemplate() {
        this.test = this.testTemplate();
      }

      testTemplate() {
        return this.fullLanguage().testTemplate().trim();
      }

      guide() {
        return CurrentItem.get();
      }

      icon() {
        return this.fullLanguage().icon();
      }

      getAceMode() {
        return this.fullLanguage().highlight_mode;
      }

      getComment() {
        return Comment.from(this.fullLanguage().comment_type);
      }

      fullLanguage() {
        return Languages.fromName(this.getLanguage());
      }

      fullName() {
        return `${this.number()}. ${this.name}`;
      }

      canChangeLanguage() {
        return this.getEditor().canChangeLanguage(this);
      }

      canChangeLayout() {
        return this.getEditor().canChangeLayout(this);
      }

      getExtraCode() {
        return `\n${this.guide().extra}\n${this.extra}\n`;
      }

      getLanguage() {
        return this.language || _.get(this.guide(), 'language');
      }

      getLayout() {
        return Layouts.from(this.layout);
      }

      getEditor() {
        return this.getType().isProblem() ?
          Editor.from(this.editor) :
          Editor.from('none');
      }

      getType() {
        return ExerciseTypes.fromName(this.type);
      }

      setType(type) {
        this.type = type;
        if (!this.getType().isProblem()) {
          delete this.editor;
        }
        this.layout = this.getEditor().initialLayout(this);
      }

      setLanguage(language) {
        Languages.fromName(language).setAssets();
        this.language = language;
        if (this.language === this.guide().language) {
          delete this.language;
        }
      }

      setEditor(editor) {
        this.editor = editor;
        this.layout = this.getEditor().initialLayout(this);
        this.setLanguage(this.getEditor().initialLanguage(this));
      }

      number() {
        return _.findIndex(this.guide().exercises, { id: this.id }) + 1;
      }

      toggleLayout() {
        if (this.canChangeLayout()) {
          this.layout = this.getLayout().next().type();
        }
      }

      needsGoal() {
        return this.getType().needsGoal(this);
      }

      needsTests() {
        return this.getType().needsTests(this);
      }

      needsChoices() {
        return this.getType().needsChoices(this);
      }

      needsExpectations() {
        return this.getType().needsExpectations(this);
      }

      needsExtra() {
        return this.getType().needsExtra(this);
      }

      needsDefaultContent() {
        return this.getType().needsDefaultContent(this);
      }

      needsSolution() {
        return this.getType().needsSolution(this);
      }

      needsHint() {
        return this.getType().needsHint(this);
      }

      needsCorollary() {
        return this.getType().needsCorollary(this);
      }

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'type');
        Validator.notEmptyString(this, 'layout');
        Validator.notEmptyString(this, 'description');
        this.getType().validate(this);
      }

      validateWithCustomEditor() {
        this.fullLanguage().validateWithCustomEditor(this);
      }

      isTextLanguage() {
        return this.getLanguage() === 'text';
      }

      getYamlTest() {
        try {
          return jsyaml.load(_.get(this, 'test', ''));
        } catch (e) {
          throw new Error($translate('malformed_document', { fullName: $translate('test'), format: 'yaml' }));
        }
      }

      hasCorollary() {
        return !_.isEmpty(_.get(this, 'corollary', '').trim());
      }

      hasTest() {
        return !_.isEmpty(_.get(this, 'test', '').trim());
      }

      hasExpectations() {
        return !_.isEmpty(this.expectations);
      }

      hasAnyChoiceSelected() {
        return _.some(this.choices, (choice) => choice.checked);
      }

      hasOneChoiceSelected() {
        return _.filter(this.choices, 'checked').length === 1;
      }

      hasMoreThanOneChoiceSelected() {
        return _.filter(this.choices, 'checked').length > 1;
      }

      getItem() {
        const exercise = Exercise.from(_.cloneDeep(this));
        if (!exercise.needsGoal()) delete exercise.goal;
        if (!exercise.needsTests()) delete exercise.test;
        if (this.manual_evaluation) delete exercise.test;
        if (!exercise.needsExtra()) delete exercise.extra;
        if (!exercise.needsChoices()) delete exercise.choices;
        if (!exercise.needsSolution()) delete exercise.solution;
        if (!exercise.needsExpectations()) delete exercise.expectations;
        if (!exercise.needsDefaultContent()) delete exercise.default_content;
        return exercise;
      }

      usesCustomEditor(){
        return this.editor == "custom";
      }

      static from(exercise = {}) {
        _.defaultsDeep(exercise, {
          name: $translate('new_exercise'),
          type: ExerciseTypes.default(),
          editor: Editor.default().name,
          layout: Layouts.default().type()
        });
        return new Exercise(exercise);
      }

    }

    return Exercise;

  });
