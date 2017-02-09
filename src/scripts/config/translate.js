angular
  .module('editor')
  .config(function ($injector, $translateProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    const LANG_ES = $injector.get('LANG_ES');
    const LANG_EN = $injector.get('LANG_EN');

    const supportedLocales = ['es', 'en'];

    $translateProvider.translations('es', LANG_ES);
    $translateProvider.translations('en', LANG_EN);

    $translateProvider.determinePreferredLanguage(() => {
      const locale = $translateProvider.resolveClientLocale().split('_')[0];
      const isSupportedLocale = _.includes(supportedLocales, locale);
      return isSupportedLocale ? locale : 'en';
    });

    $translateProvider.useSanitizeValueStrategy(null);

  });
