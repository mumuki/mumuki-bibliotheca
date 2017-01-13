angular
  .module('editor')
  .directive('navTabsInline', function () {

    return {

      restrict: 'C',
      scope: {},
      link: (scope, element) => {
        const navTabsParent = element.parent();
        const leftArrow = angular.element('<i class="fa fa-fw fa-angle-left">');
        const rightArrow = angular.element('<i class="fa fa-fw fa-angle-right">');

        const getActiveLi = () => element.children('li.active');

        navTabsParent.prepend(leftArrow);
        navTabsParent.prepend(rightArrow);
        leftArrow.on('click', () => element.scrollLeft(element[0].scrollLeft - 20));
        rightArrow.on('click', () => element.scrollLeft(element[0].scrollLeft + 20));
      }

    }

  });
