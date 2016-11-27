angular
  .module('editor')
  .service('GuideSaver', function($filter,
                                  toastr,
                                  Api,
                                  CurrentGuide,
                                  Debounce) {

    const translate = $filter('translate');

    this.save = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('toSave')
        .tap((guideToSave) => Api.saveGuide(guideToSave))
        .tap((savedGuide) => CurrentGuide.setStored(savedGuide))
        .then(() => toastr.success(translate('guide_saved_successfully')))
        .catch((error) => toastr.error(`${error.message}`));
    })

  });
