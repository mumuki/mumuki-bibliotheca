angular
  .module('editor')
  .service('LeaveItem', function ($rootScope,
                                  $state,
                                  $filter,
                                  CurrentItem,
                                  Modal) {

    const translate = $filter('translate');
    const message = translate('leave_current_item_with_changes');

    this.bindTo = ($scope, item) => {

      window.onbeforeunload = (event) => {
        return CurrentItem.hasChanges(item) ? message : null;
      };

      const isLeavingState = (toState, toParams, fromState, fromParams) => {
        return _.includes(fromState.name, '.new') ||
          !_.isEqual(_.pick(toParams, ['org', 'repo']), _.pick(fromParams, ['org', 'repo']));
      }

      const destroyer = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        if (isLeavingState(toState, toParams, fromState, fromParams) && CurrentItem.hasChanges(item)) {
          event.preventDefault();
          Modal.showLeaveItemConfirmation('Mumuki', message, () => {
            destroyer();
            return $state.go(toState, toParams, { reload: true });
          });
        }
      });

      $scope.$on('$destroy', () => window.onbeforeunload = null);
      $scope.$on('$destroy', () => destroyer());

    }

  });
