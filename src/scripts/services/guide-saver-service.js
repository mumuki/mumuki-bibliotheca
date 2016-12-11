angular
  .module('editor')
  .service('GuideSaver', function($state,
                                  $filter,
                                  toastr,
                                  Api,
                                  Guide,
                                  CurrentItem,
                                  Debounce) {

    const translate = $filter('translate');

    this.addExercise = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('addExercise')
        .then((exercise) => $state.go('editor.home.guides.detail.exercise', { eid: exercise.id }));
    })

  });
