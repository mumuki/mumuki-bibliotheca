angular
  .module('editor')
  .factory('Exercise', function($filter,
                                CurrentItem,
                                Layouts,
                                Editor,
                                ExerciseTypes,
                                Validator) {

    class Exercise {

      constructor(exercise) {
        _.defaultsDeep(this, exercise);
      }

      guide() {
        return CurrentItem.get();
      }

      icon() {
        return `da da-${this.getLanguage()}`;
      }

      fullName() {
        return `${this.number()}. ${this.name}`;
      }

      getLanguage() {
        return this.language || this.guide().language;
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
      }

      setLanguage(language) {
        this.language = language;
        if (this.language === this.guide().language) {
          delete this.language;
        }
      }

      setEditor(editor) {
        this.editor = editor;
      }

      number() {
        return _.findIndex(this.guide().exercises, { id: this.id }) + 1;
      }

      toggleLayout() {
        this.layout = this.getLayout().next().type();
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

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'type');
        Validator.notEmptyString(this, 'layout');
        Validator.notEmptyString(this, 'description');
        this.getType().validate(this);
      }

      isTextLanguage() {
        return this.getLanguage() === 'text';
      }

      hasTest() {
        return !_.isEmpty(this.test.trim());
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
        if (!exercise.needsTests()) delete exercise.test;
        if (!exercise.needsExtra()) delete exercise.extra;
        if (!exercise.needsChoices()) delete exercise.choices;
        if (!exercise.needsSolution()) delete exercise.solution;
        if (!exercise.needsExpectations()) delete exercise.expectations;
        if (!exercise.needsDefaultContent()) delete exercise.default_content;
        return exercise;
      }

      static from(exercise = {}) {
        _.defaultsDeep(exercise, {
          name: $filter('translate')('new_exercise'),
          type: ExerciseTypes.default(),
          editor: Editor.default().name,
          layout: Layouts.default().type()
        });
        return new Exercise(exercise);
      }

    }

    return Exercise;

  });
