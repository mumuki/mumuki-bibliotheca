angular
  .module('editor')
  .service('Breadcrumb', function($state,
                                  $stateParams,
                                  $filter,
                                  CurrentItem) {

    const translate = $filter('translate');

    const safeFullName = (object) => {
      if (!_.isEmpty(object)) {
        return object.fullName();
      }
    }

    this._list = [{
        name: () => translate('books'),
        state: 'editor.home.books',
        reload: true
      }, {
        name: () => translate('topics'),
        state: 'editor.home.topics',
        reload: true
      }, {
        name: () => translate('guides'),
        state: 'editor.home.guides',
        reload: true
      }, {
        name: () => safeFullName(CurrentItem.get()),
        state: 'editor.home.books.detail'
      }, {
        name: () => safeFullName(CurrentItem.get()),
        state: 'editor.home.guides.detail'
      }, {
        name: () => safeFullName(CurrentItem.get().getExercise($stateParams.eid)),
        state: 'editor.home.guides.detail.exercise'
      }, {
        name: () => translate('new_guide'),
        state: 'editor.home.guides.new'
      }
    ];

    this.list = () => {
      return this._list.filter((crumb) => $state.includes(crumb.state))
    }

    this.go = (state, reload) => {
      $state.go(state, $stateParams, { reload: !!reload });
    }

  });
