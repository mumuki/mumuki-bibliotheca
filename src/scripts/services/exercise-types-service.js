angular
  .module('editor')
  .service('ExerciseTypes', function() {

    let _exerciseTypes = {
      problem: {
        name: 'problem',
        icon: () => 'fa fa-wrench',
        isProblem: () => true,
        validate: (exercise) => exercise.getEditor().validate(exercise),
        needsExtra: (exercise) => exercise.getEditor().needsExtra(exercise),
        needsTests: (exercise) => exercise.getEditor().needsTests(exercise),
        needsChoices: (exercise) => exercise.getEditor().needsChoices(exercise),
        needsSolution: (exercise) => exercise.getEditor().needsSolution(exercise),
        needsDefaultCode: (exercise) => exercise.getEditor().needsDefaultCode(exercise),
        needsExpectations: (exercise) => exercise.getEditor().needsExpectations(exercise),
      },
      playground: {
        name: 'playground',
        icon: () => 'fa fa-soccer-ball-o',
        isProblem: () => false,
        validate: (exercise) => {},
        needsExtra: (exercise) => false,
        needsTests: (exercise) => false,
        needsChoices: (exercise) => false,
        needsSolution: (exercise) => false,
        needsDefaultCode: (exercise) => true,
        needsExpectations: (exercise) => false,
      },
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
