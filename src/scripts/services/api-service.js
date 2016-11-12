angular
  .module('editor')
  .service('Api', function ($http,
                            Auth,
                            Guide,
                            CONFIG) {

    const API = CONFIG.bibliotheca.url;
    const HTTP = Promise.resolve($http);

    const defaultConfig = (requestOptions = {}) => _.defaultsDeep(requestOptions, {
      headers: { Authorization: `Bearer ${Auth.token()}` }
    })

    this.getGuides = () => {
      return HTTP
        .call('get',`${API}/guides`, defaultConfig())
        .then((res) => res.data.guides)
        .map((guide) => Guide.from(guide));
    };

    this.getGuide = ({ org, repo }) => {
      return HTTP
        .call('get',`${API}/guides/${org}/${repo}`, defaultConfig())
        .then((res) => Guide.from(res.data));
    };

  });
