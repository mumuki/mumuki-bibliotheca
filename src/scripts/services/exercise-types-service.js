angular
  .module('editor')
  .service('ExerciseTypes', function() {

    let _exerciseTypes = [
      { name: 'problem', icon: () => 'fa-wrench' },
      { name: 'playground', icon: () => 'fa-soccer-ball-o' },
    ]

    this.get = () => {
      return _exerciseTypes;
    }

    this.default = () => {
      return _exerciseTypes[0].name;
    }

    this.fromName = (name) => {
      return _.find(this.get(), { name });
    }

  });
