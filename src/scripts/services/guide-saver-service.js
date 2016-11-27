angular
  .module('editor')
  .service('GuideSaver', function($filter,
                                  toastr,
                                  Api,
                                  Debounce) {

    const translate = $filter('translate');

    this.save = Debounce.for((guide) => {
      return Promise
        .resolve(guide)
        .call('toSave')
        .then((guideToSave) => Api.saveGuide(guideToSave))
        .then(() => toastr.success(translate('guide_saved_successfully')))
        .catch((error) => toastr.error(`${error.message}`));
    })

  });
