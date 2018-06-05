angular
  .module('editor')
  .service('Languages', function(Language, Validator, $filter) {

    const translate = $filter('translate');

    let _languages;
    const _default = {
      name: undefined,
      icon() {
        return 'fa fa-language'
      },
      testTemplate() {
        return ''
      }
    };

    this.get = () => {
      return _languages;
    }

    this.set = (languages = []) => {
      languages.map(setValidations);
      _languages = [_default, ..._(languages).map(Language.from).sortBy('name').value()];
    }

    const setValidations = (language) => {
      const validationKey = languageValidations.hasOwnProperty(language.name) ? language.name : 'default';
      return angular.merge(language, languageValidations[validationKey]);
    }

    this.default = () => {
      return _default.name;
    }

    this.fromName = (name) => {
      return Language.from(_.find(this.get(), { name }));
    }

    const languageValidations = {
      gobstones: {
        validateWithCustomEditor: (exercise) => {
          var test = exercise.getYamlTest();
          test.fullName = () => translate('test');
          Validator.notForbiddenFields(test, ['subject', 'title']);
        },
        validate: () => {}
      },
      default: {
        validateWithCustomEditor: () => {},
        validate: () => {}
      }
    }

  });
