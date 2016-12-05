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
        return `da-${this.getLanguage()}`;
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
        return Editor.from(this.editor);
      }

      getType() {
        return ExerciseTypes.fromName(this.type);
      }

      setType(type) {
        this.type = type;
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
        return this.getEditor().needsTests(this);
      }

      needsChoices() {
        return this.getEditor().needsChoices(this);
      }

      needsExpectations() {
        return this.getEditor().needsExpectations(this);
      }

      needsExtra() {
        return this.getEditor().needsExtra(this);
      }

      needsDefaultCode() {
        return this.getEditor().needsDefaultCode(this);
      }

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'type');
        Validator.notEmptyString(this, 'layout');
        Validator.notEmptyString(this, 'description');
        this.getEditor().validate(this);
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
