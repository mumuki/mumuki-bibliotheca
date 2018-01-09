angular
  .module('editor')
  .config(function ($injector, $translateProvider) {
    const LANG_ES = $injector.get('LANG_ES');
    const LANG_EN = $injector.get('LANG_EN');
    const LANG_PT = $injector.get('LANG_PT');

    const supportedLocales = ['es', 'en'];

    $translateProvider.translations('es', LANG_ES);
    $translateProvider.translations('en', LANG_EN);
    $translateProvider.translations('pt', LANG_PT);

    $translateProvider.determinePreferredLanguage(() => {
      const locale = $translateProvider.resolveClientLocale().split('_')[0];
      const isSupportedLocale = _.includes(supportedLocales, locale);
      return isSupportedLocale ? locale : 'en';
    });

    $translateProvider.useSanitizeValueStrategy(null);

  });
