angular
  .module('editor')
  .directive('navTabsInline', function ($stateParams,
                                        $timeout,
                                        $window,
                                        CurrentItem) {

    return {

      restrict: 'C',
      scope: {},
      link: (scope, element) => {
        const navTabsParent = element.parent();
        const leftArrow = angular.element('<i class="pointer fa fa-fw fa-angle-left">');
        const rightArrow = angular.element('<i class="pointer fa fa-fw fa-angle-right">');

        const elInner = () => element[0].clientWidth;
        const elOutter = () => element[0].scrollWidth;

        const hasScrollBar = () => elInner() < elOutter();

        const toggleArrows = () => {
          if (hasScrollBar()) {
            leftArrow.show();
            rightArrow.show();
          } else {
            leftArrow.hide();
            rightArrow.hide();
          }
        };

        const exerciseLayout = () => {
          const item = CurrentItem.get();
          return item.getExercise && item.getExercise($stateParams.eid).layout;
        };

        navTabsParent.prepend(leftArrow);
        navTabsParent.prepend(rightArrow);

        leftArrow.on('click', () => element.scrollLeft(element[0].scrollLeft - 20));
        rightArrow.on('click', () => element.scrollLeft(element[0].scrollLeft + 20));

        $window.onresize = toggleArrows;
        scope.$watch(exerciseLayout, () => $timeout(toggleArrows));
      },
    }

  });
