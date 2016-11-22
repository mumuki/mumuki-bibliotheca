angular
  .module('editor')
  .service('Breadcrumb', function($state,
                                  $stateParams,
                                  $filter,
                                  CurrentGuide) {

    const $translate = $filter('translate');

    const safeFullName = (object) => {
      if (!_.isEmpty(object)) {
        return object.fullName();
      }
    }

    this._list = [{
        name: () => $translate('guides'),
        state: 'editor.home.guides'
      }, {
        name: () => safeFullName(CurrentGuide.get()),
        state: 'editor.home.guides.detail'
      }, {
        name: () => safeFullName(CurrentGuide.get().getExercise($stateParams.eid)),
        state: `editor.home.guides.detail.exercise`
      },
    ];

    this.list = () => {
      return this._list.filter((crumb) => $state.includes(crumb.state))
    }

    this.go = (state) => {
      $state.go(state, $stateParams);
    }

  });
