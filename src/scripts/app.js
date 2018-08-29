angular
  .module('editor', [
    'ui.router',
    'pascalprecht.translate',
    'angular-storage',
    'angular-jwt',
    'ngCookies',
    'ui.ace',
    'ngSanitize',
    'dndLists',
    'cfp.hotkeys',
    'toastr',
    'ui.select',
    'ui.bootstrap',
    'angularLazyImg',
    'ngTagsInput'
  ]).run(Organization => Organization.load());
