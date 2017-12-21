angular
  .module('editor')
  .service('Api', function ($http,
                            Auth,
                            Guide,
                            Topic,
                            Book,
                            CONFIG) {

    const API = CONFIG.bibliotheca.url;
    const HTTP = Promise.resolve($http);

    const defaultConfig = (requestOptions = {}) => _.defaultsDeep(requestOptions, {
      headers: { }
    })

    this.getOrganization = () => {
      return HTTP
        .call('get', `${API}/organization`, defaultConfig())
        .then((res) => res.data)
    }

    this.getItems = (type, Model) => () => {
      return HTTP
        .call('get',`${API}/${type}/writable`, defaultConfig())
        .then((res) => res.data[type])
        .map((item) => Model.from(item));
    };
    this.getBooks = this.getItems('books', Book);
    this.getTopics = this.getItems('topics', Topic);
    this.getGuides = this.getItems('guides', Guide);


    this.getItem = (type, Model) => ({ org, repo }) => {
      return HTTP
        .call('get',`${API}/${type}s/${org}/${repo}`, defaultConfig())
        .then((res) => Model.from(res.data));
    };
    this.getBook = this.getItem('book', Book);
    this.getTopic = this.getItem('topic', Topic);
    this.getGuide = this.getItem('guide', Guide);


    this.saveItem = (type) => (item) => {
      return HTTP
        .call('post',`${API}/${type}s`, item, defaultConfig());
    }
    this.saveBook = this.saveItem('book');
    this.saveTopic = this.saveItem('topic');
    this.saveGuide = this.saveItem('guide');


    this.getAllItems = (type, Model) => () => {
      return HTTP
        .call('get',`${API}/${type}`, defaultConfig())
        .then((res) => res.data[type])
        .map((item) => Model.from(item));
    };
    this.getAllBooks = this.getAllItems('books', Book);
    this.getAllTopics = this.getAllItems('topics', Topic);
    this.getAllGuides = this.getAllItems('guides', Guide);


    this.getLanguages = () => {
      return HTTP
        .call('get',`${API}/languages`, defaultConfig())
        .then((res) => res.data.languages);
    };

    this.renderMarkdown = (markdown) => {
      return HTTP
        .call('post',`${API}/markdown`, { markdown }, defaultConfig())
        .then((res) => res.data.markdown);
    };

    this.getPermissions = (markdown) => {
      return HTTP
        .call('get',`${API}/permissions`, defaultConfig())
        .then((res) => res.data.permissions);
    };

    this.testSolution = (guideId, exerciseId, language, solution) => {
      return HTTP
        .call('post',`${API}/guides/${guideId}/exercises/${exerciseId}/test`, {language, solution}, defaultConfig())
        .then((res) => res.data)
    };

    this.origin = () => `?origin=${encodeURIComponent(document.location.href)}`;
    this.getLoginUrl = () =>  `${API}/login${this.origin()}`;
    this.getLogoutUrl = () =>  `${API}/logout${this.origin()}`;

    this.getInspections = () => {
      return Promise.resolve({
        expectations: 'Assigns Assigns: Calls Calls: Declares Declares: DeclaresAttribute DeclaresAttribute: DeclaresClass DeclaresClass: DeclaresComputation DeclaresComputation: DeclaresComputationWithArity DeclaresComputationWithArity0: DeclaresComputationWithArity1: DeclaresComputationWithArity2: DeclaresComputationWithArity3: DeclaresComputationWithArity4: DeclaresComputationWithArity5: DeclaresEntryPoint DeclaresEntryPoint: DeclaresEnumeration DeclaresEnumeration: DeclaresFact DeclaresFact: DeclaresFunction DeclaresFunction: DeclaresInterface DeclaresInterface: DeclaresMethod DeclaresMethod: DeclaresObject DeclaresObject: DeclaresPredicate DeclaresPredicate: DeclaresProcedure DeclaresProcedure: DeclaresRecursively DeclaresRecursively: DeclaresRule DeclaresRule: DeclaresSuperclass DeclaresSuperclass: DeclaresTag DeclaresTag: DeclaresTypeAlias DeclaresTypeAlias: DeclaresTypeSignature DeclaresTypeSignature: DeclaresVariable DeclaresVariable: Implements Implements: Includes Includes: Inherits Inherits: Instantiates Instantiates: Not:Assigns Not:Assigns: Not:Calls Not:Calls: Not:Declares Not:Declares: Not:DeclaresAttribute Not:DeclaresAttribute: Not:DeclaresClass Not:DeclaresClass: Not:DeclaresComputation Not:DeclaresComputation: Not:DeclaresComputationWithArity Not:DeclaresComputationWithArity0: Not:DeclaresComputationWithArity1: Not:DeclaresComputationWithArity2: Not:DeclaresComputationWithArity3: Not:DeclaresComputationWithArity4: Not:DeclaresComputationWithArity5: Not:DeclaresEntryPoint Not:DeclaresEntryPoint: Not:DeclaresEnumeration Not:DeclaresEnumeration: Not:DeclaresFact Not:DeclaresFact: Not:DeclaresFunction Not:DeclaresFunction: Not:DeclaresInterface Not:DeclaresInterface: Not:DeclaresMethod Not:DeclaresMethod: Not:DeclaresObject Not:DeclaresObject: Not:DeclaresPredicate Not:DeclaresPredicate: Not:DeclaresProcedure Not:DeclaresProcedure: Not:DeclaresRecursively Not:DeclaresRecursively: Not:DeclaresRule Not:DeclaresRule: Not:DeclaresSuperclass Not:DeclaresSuperclass: Not:DeclaresTag Not:DeclaresTag: Not:DeclaresTypeAlias Not:DeclaresTypeAlias: Not:DeclaresTypeSignature Not:DeclaresTypeSignature: Not:DeclaresVariable Not:DeclaresVariable: Not:Implements Not:Implements: Not:Includes Not:Includes: Not:Inherits Not:Inherits: Not:Instantiates Not:Instantiates: Not:Raises Not:Raises: Not:Rescues Not:Rescues: Not:TypesAs Not:TypesAttributeAs Not:TypesParameterAs Not:TypesReturnAs Not:TypesVariableAs Not:Uses Not:Uses: Not:UsesAnonymousVariable Not:UsesComposition Not:UsesComprehensions Not:UsesConditional Not:UsesExceptionHandling Not:UsesExceptions Not:UsesFindall Not:UsesForall Not:UsesForeach Not:UsesGuards Not:UsesIf Not:UsesInheritance Not:UsesLambda Not:UsesMixins Not:UsesNot Not:UsesPatternMatching Not:UsesRepeat Not:UsesSwitch Not:UsesWhile Raises Raises: Rescues Rescues: TypesAs TypesAttributeAs TypesParameterAs TypesReturnAs TypesVariableAs Uses Uses: UsesAnonymousVariable UsesComposition UsesComprehensions UsesConditional UsesExceptionHandling UsesExceptions UsesFindall UsesForall UsesForeach UsesGuards UsesIf UsesInheritance UsesLambda UsesMixins UsesNot UsesPatternMatching UsesRepeat UsesSwitch UsesWhile'.split(' '),
        smells: 'DiscardsExceptions DoesConsolePrint DoesNullTest DoesTypeTest HasAssignmentReturn HasCodeDuplication HasMisspelledIdentifiers HasRedundantBooleanComparison HasRedundantGuards HasRedundantIf HasRedundantLambda HasRedundantLocalVariableReturn HasRedundantParameter HasRedundantReduction HasTooShortIdentifiers HasWrongCaseIdentifiers IsLongCode ReturnsNull UsesCut UsesFail UsesUnificationOperator'.split(' ')
      });
    }

    this.importGuide = ({ organization, content }) => {
      return HTTP
        .call('post',`${API}/guides/import/${organization}/${content}`, {}, defaultConfig())
        .then((res) => res.data)
    }

    this.uploadImage = ({ org, repo }, { content, filename }) => {
      return HTTP
        .call('post',`${API}/guides/${org}/${repo}/images`, { content, filename }, defaultConfig())
        .then((res) => res.data)
    }

    this.fork = ({ org, repo }, organization) => {
      return HTTP
        .call('post',`${API}/guides/${org}/${repo}/fork`, { organization }, defaultConfig())
        .then((res) => res.data)
    }

  });
