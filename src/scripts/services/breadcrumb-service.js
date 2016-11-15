angular
  .module('editor')
  .service('Breadcrumb', function($state,
                                  $stateParams,
                                  $filter,
                                  CurrentGuide) {

    const $translate = $filter('translate');

    this._list = [
      { name: () => $translate('guides'), state: 'editor.home.guides' },
      { name: () => CurrentGuide.get().fullName(), state: 'editor.home.guides.detail' },
    ];

    this.list = () => {
      return this._list.filter((crumb) => $state.includes(crumb.state))
    }

    this.go = (state) => {
      $state.go(state, $stateParams);
    }

  });
