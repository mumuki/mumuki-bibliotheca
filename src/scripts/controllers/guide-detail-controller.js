angular
  .module('editor')
  .controller('GuideDetailController', function($scope,
                                                guide,
                                                CurrentGuide) {

    CurrentGuide.set(guide);

  });
