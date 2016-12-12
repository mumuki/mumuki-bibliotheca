angular
  .module('editor')
  .service('Editor', function($filter,
                              Validator) {

    const translate = $filter('translate');

    const throwError = (...args) => {
      throw new Error(translate(...args));
    }

    const editorType = {
      code: {
        name: 'code',
        icon: () => 'fa fa-code',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsDefaultCode: (exercise) => true,
        needsExpectations: (exercise) => true,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!exercise.hasTest() && !exercise.hasExpectations()) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      multiple_choice: {
        name: 'multiple_choice',
        icon: () => 'fa fa-check-square-o',
        needsExtra: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => true,
        needsSolution: (exercise) => false,
        needsDefaultCode: (exercise) => false,
        needsExpectations: (exercise) => false,
        validate: (exercise) => {
          Validator.notEmptyChoices(exercise);
          Validator.notIncompleteChoices(exercise);
          if (!exercise.hasAnyChoiceSelected()) {
            throwError('error_editor_multiple_choice_validation', { fullName: exercise.fullName() });
          }
        }
      },
      single_choice: {
        name: 'single_choice',
        icon: () => 'fa fa-check-circle-o',
        needsExtra: (exercise) => !exercise.isTextLanguage(),
        needsTests: (exercise) => !exercise.isTextLanguage(),
        needsChoices: (exercise) => true,
        needsSolution: (exercise) => false,
        needsDefaultCode: (exercise) => !exercise.isTextLanguage(),
        needsExpectations: (exercise) => !exercise.isTextLanguage(),
        validate: (exercise) => {
          Validator.notEmptyChoices(exercise);
          Validator.notIncompleteChoices(exercise);
          if (exercise.isTextLanguage() && !exercise.hasOneChoiceSelected()) {
            throwError('error_editor_single_choice_validation', { fullName: exercise.fullName() });
          }
          if (!exercise.isTextLanguage() && exercise.hasMoreThanOneChoiceSelected()) {
            throwError('error_editor_single_choice_validation2', { fullName: exercise.fullName() });
          }
        }
      },
      hidden: {
        name: 'hidden',
        icon: () => 'fa fa-eye-slash',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsDefaultCode: (exercise) => false,
        needsExpectations: (exercise) => false,
        validate: (exercise) => {
          if (!exercise.hasTest()) {
            throwError('error_editor_hidden_validation', { fullName: exercise.fullName() });
          }
        },
      },
      text: {
        name: 'text',
        icon: () => 'fa fa-file-text-o',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsDefaultCode: (exercise) => false,
        needsExpectations: (exercise) => true,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!exercise.hasTest() && !exercise.hasExpectations()) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      none: {
        isDisabled: true,
        isInvisible: true,
        icon: () => 'fa fa-ban',
      },
    }

    this.default = () => {
      return editorType.code;
    }

    this.types = () => {
      return _.keys(editorType);
    }

    this.from = (type) => {
      return editorType[type] || this.default();
    }

  });
