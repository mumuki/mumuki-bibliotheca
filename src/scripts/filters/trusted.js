const editor = angular.module('editor');

editor.filter('trustedUrl', ['$sce', function ($sce) {
  return function(url) {
      return $sce.trustAsResourceUrl(url);
  };
}]);

editor.filter('trustedHtml', ['$sce', function ($sce) {
  return function(html) {
    return $sce.trustAsHtml(html);
  };
}]);

editor.filter('lazyLoadScript', ['$ocLazyLoad', function ($ocLazyLoad) {
  return function(url) {
    url && $ocLazyLoad.load(url);
  };
}]);
