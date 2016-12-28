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
      const organization = CurrentItem.getOrganization().toLowerCase();
      const content = `mumuki-${itemTranslated}${language}-${kebabCase}`;
      const slug = this.from(organization, content);
      slug.fullName = () => item.fullName(),
      Validator.notEmptyString(slug, 'organization');
      Validator.notEmptyString(slug, 'content');
      item.slug = slug.toString();
    }

    this.from = (organization, content) => {
      const slug = {
        organization: organization,
        content: content,
        toString: () => `${slug.organization}/${slug.content}`,
        allows: (other) => slug.matchOrganization(other) && slug.matchContent(other),
        matchContent: (other) =>  slug.content === other.content || slug.content === '*' || slug.organization === '*',
        matchOrganization: (other) =>  slug.organization === other.organization || slug.organization === '*',
      }
      return slug
    }

    this.parse = (slug_string) => {
      const [organization, content] = slug_string.split('/');
      return this.from(organization, content);
    }

  });
