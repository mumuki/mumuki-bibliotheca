import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';
import angular from "angular";
import "lodash"
import "@uirouter/angularjs"
import "angular-translate"
import "angular-storage"
import "angular-jwt"
import 'expose-loader?Promise!bluebird';
import "ace-builds/src-noconflict/ace"
import "angular-ui-ace"
import "angular-sanitize"
import "angular-drag-and-drop-lists"
import "@bower-components/mumuki-styles/dist/javascripts/mumuki-styles";
import "angular-hotkeys"
import "angular-toastr"
import "ui-select"
import "angular-ui-bootstrap"
import "@bower-components/angular-lazy-img/release/angular-lazy-img.min"
import "angular-cookies"
import "js-yaml"
import "nsTagsInput"

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
