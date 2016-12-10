angular
  .module('editor')
  .factory('Topic', function ($injector,
                              Slug,
                              Validator,
                              CurrentItem) {

    class Topic {

      constructor(topic) {
        _.defaultsDeep(this, topic);
      }

      icon() {
        return 'fa fa-commenting';
      }

      fullName() {
        return this.name;
      }

      params() {
        const [org, repo] = this.slug.split('/');
        return { org, repo };
      }

      toSave() {
        this.validate();
        const topic = Topic.from(_.cloneDeep(this));
        Slug.create(topic, 'topic');
        topic.lessons = _.map(topic.lessons, (lesson) => lesson.slug)
        return topic;
      }

      getItem() {
        const topic = Topic.from(_.cloneDeep(this));
        Slug.create(topic, 'topic');
        topic.lessons = _.map(topic.lessons, (lesson) => lesson.slug)
        return topic;
      }

      setLocale(locale) {
        this.locale = locale;
      }

      addLesson(lesson) {
        this.lessons.push(lesson);
      }

      removeLesson(lesson) {
        _.remove(this.lessons, { id: lesson.id });
      }

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'locale');
        Validator.notEmptyString(this, 'description');
      }

      canSave() {
        try {
          this.validate();
          return CurrentItem.hasChanges(this.toSave());
        } catch(_) {
          return false;
        }
      }

      static from(topic = {}) {
        _.defaultsDeep(topic, {
          locale: $injector.get('$translate').use(),
          lessons: [],
        });
        return new Topic(topic);
      }

      static sortBy() {
        return ['slug'];
      }

    }

    return Topic;

  });
