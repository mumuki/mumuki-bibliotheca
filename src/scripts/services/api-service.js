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

    this.origin = () => `?origin=${encodeURIComponent(document.location.href)}`;
    this.getLoginUrl = () =>  `${API}/login${this.origin()}`;
    this.getLogoutUrl = () =>  `${API}/logout${this.origin()}`;
  });
