angular
  .module('editor')
  .service('Slug', function($translate,
                            Validator,
                            CurrentItem) {

    this.create = (item, type) => {
      if (!_.isEmpty(item.slug)) {
        Validator.notEmptyString(item, 'slug');
        return item.slug;
      }
      const translationTable = $translate.getTranslationTable(item.locale);
      const itemTranslated = _.deburr(translationTable[type].toLowerCase());
      const kebabCase = _.kebabCase(item.name);
      const language = item.language ? `-${item.language}` : '';
      const slug = {
        repository: `mumuki-${itemTranslated}${language}-${kebabCase}`,
        organization: CurrentItem.getOrganization(),
        fullName: () => item.fullName(),
        toString: () => `${slug.organization}/${slug.repository}`,
      }
      Validator.notEmptyString(slug, 'organization');
      Validator.notEmptyString(slug, 'repository');
      item.slug = slug.toString();
    }

  });
