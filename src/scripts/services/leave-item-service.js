angular
  .module('editor')
  .service('LeaveItem', function ($rootScope,
                                  $state,
                                  $filter,
                                  CurrentItem,
                                  Modal) {

    const translate = $filter('translate');
    const message = translate('leave_current_item_with_changes');

    this.bindTo = ($scope) => {

      window.onbeforeunload = (event) => {
        return CurrentItem.hasChanges($scope.getItem()) ? message : null;
      };

      const params = (state) => _.pick(state.params, ['org', 'repo']);

      const isLeavingState = (to, from) => {
        return _.includes(from.state.name, '.new') || !_.isEqual(params(to), params(from));
      }

      const needsModal = (to, from) => {
        return !$scope.isNew && isLeavingState(to, from) && CurrentItem.hasChanges($scope.getItem());
      }

      const destroyer = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        const to = { state: toState, params: toParams };
        const from = { state: fromState, params: fromParams };

        if (needsModal(to, from)) {
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
