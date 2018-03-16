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
        }
      }
    }

    this.input_right = input.right;
    this.input_bottom = input.bottom;
    this.input_kids = input.kids;

    this.default = () => {
      return this.input_right;
    }

    this.from = (type) => {
      return this[type] || this.default();
    }

  });
