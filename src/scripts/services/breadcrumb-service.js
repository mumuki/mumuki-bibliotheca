angular
  .module('editor')
  .service('Breadcrumb', function($state,
                                  $stateParams) {

    this._list = [
      { name: 'editor', state: 'editor' }
    ];

    this.list = () => {
      return this._list.filter((crumb) => $state.includes(crumb.state))
    }

    this.go = (crumb) => {
      $state.go(crumb.state);
    }

  });
