angular
  .module('editor')
  .service('ExerciseTypes', function(Validator) {

    let _exerciseTypes = {
      problem: {
        name: 'problem',
        icon: () => 'fa fa-wrench',
        isProblem: () => true,
        isPlayground: () => false,
        validate: (exercise) => exercise.getEditor().validate(exercise),
        needsExtra: (exercise) => exercise.getEditor().needsExtra(exercise),
        needsGoal: (exercise) => false,
        needsTests: (exercise) => exercise.getEditor().needsTests(exercise),
        needsChoices: (exercise) => exercise.getEditor().needsChoices(exercise),
        needsFreeForm: (exercise) => exercise.getEditor().needsFreeForm(exercise),
        needsSolution: (exercise) => exercise.getEditor().needsSolution(exercise),
        needsExpectations: (exercise) => exercise.getEditor().needsExpectations(exercise),
        needsDefaultContent: (exercise) => exercise.getEditor().needsDefaultContent(exercise),
        needsHint: (exercise) => true,
        needsAssistanceRules: (exercise) => true,
        needsCorollary: (exercise) => true,
        needsRandomizations: (exercise) => true,
      },
      playground: {
        name: 'playground',
        icon: () => 'fa fa-soccer-ball-o',
        isProblem: () => false,
        isPlayground: () => true,
        validate: (exercise) => {
          Validator.languageSupport(exercise, 'queriable');
        },
        needsExtra: (exercise) => true,
        needsGoal: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsFreeForm: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        needsHint: (exercise) => true,
        needsAssistanceRules: (exercise) => false,
        needsCorollary: (exercise) => false,
        needsRandomizations: (exercise) => true,
      },
      reading: {
        name: 'reading',
        icon: () => 'fa fa-align-left',
        isProblem: () => false,
        isPlayground: () => false,
        validate: (exercise) => {},
        needsExtra: (exercise) => false,
        needsGoal: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsFreeForm: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        needsHint: (exercise) => false,
        needsAssistanceRules: (exercise) => false,
        needsCorollary: (exercise) => false,
        needsRandomizations: (exercise) => false,
      },
      interactive: {
        name: 'interactive',
        icon: () => 'fa fa-refresh',
        isProblem: () => false,
        isPlayground: () => false,
        validate: (exercise) => {
          Validator.notEmptyString(exercise, 'goal');
          Validator.languageSupport(exercise, 'triable');
        },
        needsExtra: (exercise) => true,
        needsGoal: (exercise) => true,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsFreeForm: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        needsHint: (exercise) => true,
        needsAssistanceRules: (exercise) => false,
        needsCorollary: (exercise) => true,
        needsRandomizations: (exercise) => true,
      }

    }

    this.get = () => {
      return _.values(_exerciseTypes);
    }

    this.default = () => {
      return _exerciseTypes.problem.name;
    }

    this.fromName = (name) => {
      return _exerciseTypes[name];
    }

  });
