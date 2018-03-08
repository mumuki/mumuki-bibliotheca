angular
  .module('editor')
  .service('Layouts', function() {

    const input = {
      right: {
        icon() {
          return 'fa fa-columns';
        },
        type() {
          return 'input_right';
        },
        next() {
          return input.bottom;
        }
      },
      bottom: {
        icon() {
          return 'fa fa-window-maximize';
        },
        type() {
          return 'input_bottom';
        },
        next() {
          return input.kids;
        }
      },
      kids: {
        icon() {
          return 'fa fa-gamepad';
        },
        type() {
          return 'input_kids';
        },
        next() {
          return input.right;
        },
        usableBy(language){
          return this.supportedLanguages().includes(language);
        },
        supportedLanguages(){
          return ["gobstones"];
        },
        usesCustomEditor(language){
          return this.languagesWithCustomEditor().includes(language);
        },
        languagesWithCustomEditor(){
          return ["gobstones"];
        }

      }
    }

    const layout_defaults = {
      getNext(language) {
        const next_layout = this.next();
        if(next_layout.usableBy(language)){
          return next_layout;
        }
        return next_layout.getNext(language);
      },
      usableBy(language){
        return true;
      },
      usesCustomEditor(language){
        return false;
      }
    }

    for(var layout in input){
      input[layout] = angular.extend({}, layout_defaults, input[layout])
    }

    this.input_right = input.right;
    this.input_bottom = input.bottom;
    this.input_kids = input.kids;

    this.default = () => {
      return this.input_right;
    }

    this.from = (type, language) => {
      if(type && this[type].usableBy(language)){
        return this[type];
      }
      return this.default();
    }

  });
