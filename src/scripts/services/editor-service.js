angular
  .module('editor')
  .service('Editor', function($filter,
                              Layouts,
                              Validator) {

    const translate = $filter('translate');

    const throwError = (...args) => {
      throw new Error(translate(...args));
    }

    const hasEvaluation = (exercise) => {
      return exercise.manual_evaluation || exercise.hasTest() || exercise.hasExpectations();
    }

    const editorType = {
      code: {
        name: 'code',
        icon: () => 'fa fa-code',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => true,
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      multiple_files: {
        name: 'multiple_files',
        isMultifile: true,
        icon: () => 'fa fa-files-o',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => true,
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
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
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => false,
        initialLanguage: (exercise) => 'text',
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
        needsExpectations: (exercise) => !exercise.isTextLanguage(),
        needsDefaultContent: (exercise) => !exercise.isTextLanguage(),
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          Validator.notEmptyChoices(exercise);
          Validator.notIncompleteChoices(exercise);
          if (exercise.isTextLanguage() && !exercise.hasOneChoiceSelected()) {
            throwError('error_editor_single_choice_validation_only_one', { fullName: exercise.fullName() });
          }
          if (!exercise.isTextLanguage()) {
            Validator.notIncompleteExpectations(exercise);
            if (exercise.hasAnyChoiceSelected()) {
              throwError('error_editor_single_choice_validation_no_selected', { fullName: exercise.fullName() });
            }
            if (!hasEvaluation(exercise)) {
              throwError('error_editor_code_validation', { fullName: exercise.fullName() });
            }
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
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => false,
        initialLayout: (exercise) => Layouts.input_bottom.type(),
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          if (!exercise.hasTest() || !exercise.hasCorollary()) {
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
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      upload: {
        name: 'upload',
        icon: () => 'fa fa-upload',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => false,
        initialLayout: (exercise) => Layouts.input_bottom.type(),
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      custom: {
        name: 'custom',
        icon: () => 'fa fa-terminal',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => true,
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => true,
        canChangeLayout: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language,
        validate: (exercise) => {
          exercise.validateWithCustomEditor();
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      none: {
        isDisabled: true,
        isInvisible: true,
        icon: () => 'fa fa-ban',
        canChangeLayout: (exercise) => exercise.getType().isPlayground(),
        initialLayout: (exercise) => Layouts.input_bottom.type(),
        canChangeLanguage: (exercise) => true,
        initialLanguage: (exercise) => exercise.language
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
