angular
  .module('editor')
  .service('Editor', function() {

    const editorType = {
      code: {
        icon: () => 'fa-code',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsDefaultCode: (exercise) => true,
        needsExpectations: (exercise) => true,
      },
      multiple_choice: {
        icon: () => 'fa-check-square-o',
        needsExtra: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => true,
        needsDefaultCode: (exercise) => false,
        needsExpectations: (exercise) => false,
      },
      single_choice: {
        icon: () => 'fa-check-circle-o',
        needsExtra: (exercise) => exercise.language !== 'text',
        needsTests: (exercise) => exercise.language !== 'text',
        needsChoices: (exercise) => true,
        needsDefaultCode: (exercise) => exercise.language !== 'text',
        needsExpectations: (exercise) => exercise.language !== 'text',
      },
      hidden: {
        icon: () => 'fa-eye-slash',
        needsExtra: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsDefaultCode: (exercise) => false,
        needsExpectations: (exercise) => false,
      },
      text: {
        icon: () => 'fa-file-text-o',
        needsExtra: (exercise) => true,
        needsTests: (exercise) => true,
        needsChoices: (exercise) => false,
        needsDefaultCode: (exercise) => true,
        needsExpectations: (exercise) => false,
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
