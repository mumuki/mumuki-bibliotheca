const editor = angular.module('editor')

  editor.filter('trustedUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
  });

  editor.filter('trustedHtml', function ($sce) {
    return function(html) {
      return $sce.trustAsHtml(html);
    };
  });
