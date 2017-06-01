angular
  .module('editor')
  .service('ExerciseTypes', function() {

    let _exerciseTypes = {
      problem: {
        name: 'problem',
        icon: () => 'fa fa-wrench',
        isProblem: () => true,
        isPlayground: () => false,
        validate: (exercise) => exercise.getEditor().validate(exercise),
        needsExtra: (exercise) => exercise.getEditor().needsExtra(exercise),
        needsTests: (exercise) => exercise.getEditor().needsTests(exercise),
        needsChoices: (exercise) => exercise.getEditor().needsChoices(exercise),
        needsSolution: (exercise) => exercise.getEditor().needsSolution(exercise),
        needsExpectations: (exercise) => exercise.getEditor().needsExpectations(exercise),
        needsDefaultContent: (exercise) => exercise.getEditor().needsDefaultContent(exercise),
        needsHint: (exercise) => true,
        needsCorollary: (exercise) => true,
      },
      playground: {
        name: 'playground',
        icon: () => 'fa fa-soccer-ball-o',
        isProblem: () => false,
        isPlayground: () => true,
        validate: (exercise) => {},
        needsExtra: (exercise) => true,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        needsHint: (exercise) => true,
        needsCorollary: (exercise) => false,
      },
      reading: {
        name: 'reading',
        icon: () => 'fa fa-align-left',
        isProblem: () => false,
        isPlayground: () => false,
        validate: (exercise) => {},
        needsExtra: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsExpectations: (exercise) => false,
        needsDefaultContent: (exercise) => false,
        needsHint: (exercise) => false,
        needsCorollary: (exercise) => false,
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
