angular
  .module('editor')
  .service('Languages', function(Language) {

    let _languages;

    this.get = () => {
      return _languages;
    }

    this.set = (languages = []) => {
      _languages = languages.map(Language.from);
    }

    this.default = () => {
      return _languages[0].name;
    }

    this.fromName = (name) => {
      return Language.from(_.find(this.get(), { name }));
    }

  });
