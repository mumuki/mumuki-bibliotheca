angular
  .module('editor')
  .directive('emojis', function (store, EMOJIS) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/emojis.html',
      scope: {
        emojiClick: '='
      },
      controller: ($scope) => {

        const RECENTS = 'recentEmojis';
        store.set(RECENTS, store.get(RECENTS) || []);

        const recentGroup = {category: 'Recents', icon: 'fa-clock-o', emojis: store.get(RECENTS)};

        const _EMOJIS = [recentGroup, ...EMOJIS];

        const addToLocalStorage = (emoji) => {
          _.chain([emoji])
            .concat(store.get(RECENTS))
            .compact()
            .uniq()
            .take(45)
            .tap((emojis) => store.set(RECENTS, emojis))
            .tap((emojis) => recentGroup.emojis = emojis)
            .value();
        };

        $scope.groups = _.map(_EMOJIS, (em) => ({
          category: em.category,
          icon: em.icon,
          isSelected: false
        }));

        $scope.emojis = (group) => {
          const emojisGroup = _.find(_EMOJIS, {category: group.category});
          return _.difference(emojisGroup.emojis, emojisGroup.notSupported);
        };

        $scope.selectGroup = (group) => {
          $scope.groups.forEach((g) => g.isSelected = false);
          group.isSelected = true;
        };

        $scope.isActive = (group) => group.isSelected;

        $scope.selectEmoji = (emoji) => {
          addToLocalStorage(emoji);
          $scope.emojiClick(emoji);
        };

        $scope.selectGroup($scope.groups[_.isEmpty(recentGroup.emojis) ? 1 : 0]);

      },
      link: (scope, element) => {
        const groups = element.find('ul');
        const dropdown = element.find('.dropdown');
        groups.on('click', () => setTimeout(() => dropdown.addClass('open'), 5));
      }

    }

  });
