angular
  .module('editor')
  .service('GuideSaver', function($state,
                                  $filter,
                                  toastr,
                                  Api,
                                  CurrentItem,
                                  Debounce) {

    const translate = $filter('translate');

    this.save = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('toSave')
        .tap((guideToSave) => Api.saveGuide(guideToSave))
        .tap((savedGuide) => CurrentItem.setStored(savedGuide))
        .then(() => toastr.success(translate('guide_saved_successfully')))
        .catch((error) => toastr.error(`${error.message}`));
    })

    this.addExercise = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('addExercise')
        .then((exercise) => $state.go('editor.home.guides.detail.exercise', { eid: exercise.id }));
    })

  });
