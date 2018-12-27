angular
  .module('editor')
  .service('Editor', function($filter,
                              Layouts,
                              Validator) {

    const translate = $filter('translate');

    const throwError = (...args) => {
      throw new Error(translate(...args));
    };

    const hasEvaluation = (exercise) => {
      return exercise.manual_evaluation || exercise.hasTest() || exercise.hasExpectations();
    };

    const setDefaultContentString = (exercise) => {
      exercise.default_content = _.isString(exercise.default_content) ? exercise.default_content : '';
    };

    const setDefaultContentHash = (exercise) => {
      exercise.default_content = _.isPlainObject(exercise.default_content) ? exercise.default_content : {};
    };

    const editorDefault = {
        name: 'default',
        isDisabled: false,
        isInvisible: false,
        isMultifile: false,
        icon: () => 'fa fa-smile-o',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => true,
        needsFreeForm: (exercise) => false,
        needsSolution: (exercise) => true,
        needsExpectations: (exercise) => true,
        needsDefaultContent: (exercise) => true,
        canChangeLayout: (exercise) => true,
        canChangeLanguage: (exercise) => true,
        initialLayout: (exercise) => exercise.layout,
        initialLanguage: (exercise) => exercise.getLanguage(),
        setDefaultContent: (exercise) => setDefaultContentString(exercise),
        transformToServer: (exercise) => {},
        transformFromServer: (exercise) => {},
        validate: (exercise) => {
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
    };

    const editorType = {
      code: {
        name: 'code',
        icon: () => 'fa fa-code',
        needsChoices: (exercise) => false,
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
        needsChoices: (exercise) => false,
        setDefaultContent: (exercise) => setDefaultContentHash(exercise),
        transformToServer: (exercise) => {
          exercise.toMultifileString(exercise, 'default_content');
          if (exercise.isHtmlLanguage()) exercise.toMultifileString(exercise, 'test');
        },
        transformFromServer: (exercise) => {
          exercise.fromMultifileString(exercise, 'default_content');
          if (exercise.isHtmlLanguage()) exercise.fromMultifileString(exercise, 'test');
        },
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
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
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
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => !exercise.isTextLanguage(),
        needsDefaultContent: (exercise) => !exercise.isTextLanguage(),
        setDefaultContent: (exercise) => editorType.single_choice.needsDefaultContent(exercise) && setDefaultContentString(exercise),
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
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => false,
        initialLayout: (exercise) => Layouts.input_bottom.type(),
        validate: (exercise) => {
          if (!exercise.hasTest() || !exercise.hasCorollary()) {
            throwError('error_editor_hidden_validation', { fullName: exercise.fullName() });
          }
        },
      },
      text: {
        name: 'text',
        icon: () => 'fa fa-file-text-o',
        needsChoices: (exercise) => false,
        needsDefaultContent: (exercise) => false,
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
        needsChoices: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        canChangeLayout: (exercise) => false,
        initialLayout: (exercise) => Layouts.input_bottom.type(),
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
        needsChoices: (exercise) => false,
        validate: (exercise) => {
          exercise.validateWithCustomEditor();
          Validator.notIncompleteExpectations(exercise);
          if (!hasEvaluation(exercise)) {
            throwError('error_editor_code_validation', { fullName: exercise.fullName() });
          }
        }
      },
      free_form: {
        name: 'free_form',
        icon: () => 'fa fa-list-alt',
        needsExtra: (exercise) => false,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsFreeForm: (exercise) => true,
        needsDefaultContent: (exercise) => false,
        needsExpectations: (exercise) => false,
        canChangeLanguage: (exercise) => false,
        initialLanguage: (exercise) => 'text',
        initialLayout: (exercise) => exercise.layout,
        validate: (exercise) => {
          Validator.notEmptyString(exercise, 'free_form_editor_source');
        }
      },
      none: {
        isDisabled: true,
        isInvisible: true,
        icon: () => 'fa fa-ban',
        canChangeLayout: (exercise) => exercise.getType().isPlayground(),
        initialLayout: (exercise) => Layouts.input_bottom.type(),
      },
    };

    _.forOwn(editorType, (value, key) => {
      editorType[key] = _.defaultsDeep(value, editorDefault);
    });

    this.default = () => {
      return editorType.code;
    };

    this.types = () => {
      return _.keys(editorType);
    };

    this.from = (type) => {
      return editorType[type] || this.default();
    }

  });
