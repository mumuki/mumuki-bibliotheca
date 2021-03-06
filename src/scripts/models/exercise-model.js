import jsyaml from "js-yaml"

const LANGUAGES_WITH_TEST_UI = [
  { name: "gobstones", uiOption: "UI", textOption: "YAML" },
];

angular
  .module('editor')
  .factory('Exercise', function ($filter,
                                 CurrentItem,
                                 Layouts,
                                 Editor,
                                 Comment,
                                 Languages,
                                 ExerciseTypes,
                                 Validator) {

    const $translate = $filter('translate');

    _.mixin({
      match: (string, regexp) => string.match(regexp),
      flipTransform: (object, value, func) => _.transform(object, func, value),
    });

    class Exercise {

      constructor(exercise) {
        _.defaultsDeep(this, exercise);
        this.useTestOrTemplate();
        this.transformFromServer();
      }

      useTestOrTemplate() {
        this.test = this.hasTest() ? this.test : this.testTemplate();
      }

      resetTestTemplate() {
        this.test = this.testTemplate();
      }

      testTemplate() {
        return this.fullLanguage().testTemplate().trim();
      }

      guide() {
        return CurrentItem.get();
      }

      icon() {
        return this.fullLanguage().icon();
      }

      getAceMode() {
        return this.fullLanguage().highlight_mode;
      }

      getComment() {
        return Comment.from(this.fullLanguage().comment_type);
      }

      fullLanguage() {
        return Languages.fromName(this.getLanguage());
      }

      fullName() {
        return `${this.number()}. ${this.name}`;
      }

      canChangeLanguage() {
        return this.getEditor().canChangeLanguage(this);
      }

      canChangeLayout() {
        return this.getEditor().canChangeLayout(this);
      }

      getExtraCode() {
        return `\n${this.guide().extra}\n${this.extra}\n`;
      }

      getLanguage() {
        return this.language || _.get(this.guide(), 'language');
      }

      getLayout() {
        return Layouts.from(this.layout);
      }

      getEditor() {
        return this.getType().isProblem() ?
          Editor.from(this.editor) :
          Editor.from('none');
      }

      isMultifile() {
        return !!this.getEditor().isMultifile;
      }

      getType() {
        return ExerciseTypes.fromName(this.type);
      }

      setType(type) {
        this.type = type;
        if (!this.getType().isProblem()) {
          delete this.editor;
        }
        this.layout = this.getEditor().initialLayout(this);
      }

      setLanguage(language) {
        Languages.fromName(language).setAssets();
        this.language = language;
        if (this.language === this.guide().language) {
          delete this.language;
        }
      }

      changeLanguage(language) {
        this.setLanguage(language);
        if (language) this.test = Languages.fromName(language).testTemplate();
      }

      setEditor(editor) {
        this.editor = editor;
        this.initializeEditor();
      }

      initializeEditor() {
        this.layout = this.getEditor().initialLayout(this);
        this.setLanguage(this.getEditor().initialLanguage(this));
        this.transformFromServer();
        this.getEditor().setDefaultContent(this);
      }

      transformFromServer() {
        this.getEditor().transformFromServer(this);
      }

      number() {
        return _.findIndex(this.guide().exercises, { id: this.id }) + 1;
      }

      toggleLayout() {
        if (this.canChangeLayout()) {
          this.layout = this.getLayout().next().type();
        }
      }

      hasInterpolations(content) {
        const { start, end } = this.escapedComment();
        return new RegExp(`${start}\.\.\.\\w+\.\.\.${end}`).test(content);
      }

      escapedComment() {
        return _.mapValues(this.getComment(), _.escapeRegExp);
      }

      needsGoal() {
        return this.getType().needsGoal(this);
      }

      needsFreeForm() {
        return this.getType().needsFreeForm(this);
      }

      needsTests() {
        return this.getType().needsTests(this);
      }

      needsChoices() {
        return this.getType().needsChoices(this);
      }

      needsExpectations() {
        return this.getType().needsExpectations(this);
      }

      needsExtra() {
        return this.getType().needsExtra(this);
      }

      needsDefaultContent() {
        return this.getType().needsDefaultContent(this);
      }

      needsSolution() {
        return this.getType().needsSolution(this);
      }

      needsHint() {
        return this.getType().needsHint(this);
      }

      needsAssistanceRules() {
        return this.getType().needsAssistanceRules(this);
      }

      needsCorollary() {
        return this.getType().needsCorollary(this);
      }

      needsRandomizations() {
        return this.getType().needsRandomizations(this);
      }

      validate() {
        Validator.notEmptyString(this, 'name');
        Validator.notEmptyString(this, 'type');
        Validator.notEmptyString(this, 'layout');
        Validator.notEmptyString(this, 'description');
        Validator.validateAssistanceRules(this);
        Validator.validateRandomizations(this);
        this.getType().validate(this);
      }

      validateWithCustomEditor() {
        this.fullLanguage().validateWithCustomEditor(this);
      }

      isLanguage(language) {
        return this.getLanguage() === language;
      }

      isTextLanguage() {
        return this.isLanguage('text');
      }

      isGobstonesLanguage() {
        return this.isLanguage('gobstones');
      }

      isHtmlLanguage() {
        return this.isLanguage('html');
      }

      getTestUIOptions() {
        return _.find(LANGUAGES_WITH_TEST_UI, { name: this.getLanguage() });
      }

      hasTestUI() {
        return this.getTestUIOptions() != null;
      }

      getYamlTest() {
        try {
          return jsyaml.load(_.get(this, 'test', ''));
        } catch (e) {
          throw new Error($translate('malformed_document', { fullName: $translate('test'), format: 'yaml' }));
        }
      }

      hasCorollary() {
        return !_.isEmpty(_.get(this, 'corollary', '').trim());
      }

      hasTest() {
        let test = _.get(this, 'test', '');
        if (_.isString(test)) test = test.trim();
        return !_.isEmpty(test);
      }

      hasExpectations() {
        return !_.isEmpty(this.expectations);
      }

      hasAnyChoiceSelected() {
        return _.some(this.choices, (choice) => choice.checked);
      }

      hasOneChoiceSelected() {
        return _.filter(this.choices, 'checked').length === 1;
      }

      hasMoreThanOneChoiceSelected() {
        return _.filter(this.choices, 'checked').length > 1;
      }

      getItem() {
        const exercise = Exercise.from(_.cloneDeep(this));
        if (!exercise.needsGoal()) delete exercise.goal;
        if (!exercise.needsTests()) delete exercise.test;
        if (this.manual_evaluation) delete exercise.test;
        if (!exercise.needsExtra()) delete exercise.extra;
        if (!exercise.needsChoices()) delete exercise.choices;
        if (!exercise.needsSolution()) delete exercise.solution;
        if (!exercise.needsExpectations()) delete exercise.expectations;
        if (!exercise.needsDefaultContent()) delete exercise.default_content;
        if (!exercise.needsAssistanceRules()) delete exercise.assistance_rules;
        if (!exercise.needsRandomizations()) delete exercise.randomizations;
        exercise.getEditor().transformToServer(exercise);
        return exercise;
      }

      usesCustomEditor() {
        return this.editor == "custom";
      }

      isKidsLayout() {
        return this.getLayout() === Layouts.input_kids;
      }

      toMultifileString(object, field) {
        if (!_.isString(object[field])) {
          object[field] = _.chain(object)
            .get(field, {})
            .flipTransform([], (res, value, key) => this.toFile(res, value, key, this.getComment()))
            .join('\n')
            .value();
        }
      }

      fromMultifileString(object, field) {
        const { start, end } = this.escapedComment();
        const regexpString = `${start}<(.+?)#${end}((\\\s|\\\S)*?)${start}#(.+?)>${end}`;
        if (!_.isPlainObject(object[field])) {
          object[field] = _.chain(object)
            .get(field, '')
            .match(new RegExp(regexpString, 'gm'))
            .flipTransform({}, (res, capture) => this.fromFile(res, capture, new RegExp(regexpString)))
            .value();
        }
      }

      toFile(result, value, key, { start, end }) {
        result.push(`${start}<${key}#${end}${value}${start}#${key}>${end}`);
      }

      fromFile(result, capture, regexp) {
        const [_, key, value, __, confirmKey] = capture.match(regexp);
        if (key === confirmKey) result[key] = value;
      }

      static from(exercise = {}) {
        _.defaultsDeep(exercise, {
          name: $translate('new_exercise'),
          type: ExerciseTypes.default(),
          editor: Editor.default().name,
          layout: Layouts.default().type(),
        });
        return new Exercise(exercise);
      }

    }

    return Exercise;

  });
