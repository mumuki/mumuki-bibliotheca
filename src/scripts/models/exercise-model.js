angular
  .module('editor')
  .factory('Exercise', function(CurrentGuide, Layouts) {

    class Exercise {

      constructor(exercise) {
        _.defaultsDeep(this, exercise);
      }

      guide() {
        return CurrentGuide.get();
      }

      icon() {
        return `da-${this.getLanguage()}`;
      }

      getLanguage() {
        return this.language || this.guide().language;
      }

      setLanguage(language) {
        this.language = language;
        if (this.language === this.guide().language) {
          delete this.language;
        }
      }

      getLayout() {
        return Layouts.from(this.layout);
      }

      toggleLayout() {
        this.layout = this.getLayout().next().type();
      }

      static from(exercise = {}) {
        return new Exercise(exercise);
      }

    }

    return Exercise;

  });
