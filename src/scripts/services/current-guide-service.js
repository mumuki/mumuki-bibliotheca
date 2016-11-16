angular
  .module('editor')
  .service('CurrentGuide', function (Exercise) {

    let _guide;

    this.set = (guide) => {
      _guide = guide;
    }

    this.get = () => {
      return _guide
    }

    this.getExercise = (id) => {
      const exercise = _.chain(this.get()).get('exercises', []).find({ id }).value();
      return Exercise.from(exercise);
    }

  });
