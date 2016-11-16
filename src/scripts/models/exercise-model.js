angular
  .module('editor')
  .factory('Exercise', function() {

    class Exercise {

      constructor(exercise) {
        _.defaultsDeep(this, exercise);
      }

      static from(exercise = {}) {
        return new Exercise(exercise);
      }

    }

    return Exercise;

  });
