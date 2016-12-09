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

    this.save = Debounce.for((guide, callback = () => {}) => {
      return Promise
        .resolve(Guide.from(guide))
        .call('toSave')
        .tap((guideToSave) => Api.saveGuide(guideToSave))
        .tap((savedGuide) => CurrentItem.setStored(savedGuide))
        .tap((savedGuide) => callback(savedGuide))
        .tap((savedGuide) => toastr.success(translate('guide_saved_successfully')))
        .catch(Error, (error) => toastr.error(`${error.message}`))
        .catch((res) => toastr.error(`${res.data.message}`));
    })

    this.addExercise = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('addExercise')
        .then((exercise) => $state.go('editor.home.guides.detail.exercise', { eid: exercise.id }));
    })

  });
