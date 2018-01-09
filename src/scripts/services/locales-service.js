angular
  .module('editor')
  .service('Locales', function (Locale) {

    const _locales = [
      { name: 'spanish', code: 'es' },
      { name: 'english', code: 'en' },
      { name: 'portuguese', code: 'pt' }
    ].map(Locale.from);

    this.Locale = Locale;

    this.get = () => {
      return _locales;
    }

    this.fromCode = (code) => {
      return _.find(this.get(), { code });
    }

  });
