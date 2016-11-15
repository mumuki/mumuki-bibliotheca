angular
  .module('editor')
  .service('Languages', function(Api, Language) {

    let _languages;

    this.get = () => {
      return _languages;
    }

    this.set = (languages = []) => {
      _languages = languages.map(Language.from);
    }

    this.fromName = (name) => {
      return Language.from(_.find(this.get(), { name }));
    }

  });
