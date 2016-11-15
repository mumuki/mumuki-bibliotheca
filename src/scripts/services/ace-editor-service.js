angular
  .module('editor')
  .service('AceEditor', function () {

    this.update = (editor, placeholder) => {
      let shouldShow = !editor.session.getValue().length;
      let node = editor.renderer.emptyMessageNode;
      if (!shouldShow && node) {
        editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
        editor.renderer.emptyMessageNode = null;
      } else if (shouldShow && !node) {
        node = editor.renderer.emptyMessageNode = document.createElement('div');
        node.textContent = placeholder
        node.className = 'ace_invisible ace_emptyMessage'
        node.style.padding = '0 4px'
        editor.renderer.scroller.appendChild(node);
      }
    };

    this.onLoadDefault = (editor) => {
      editor.$blockScrolling = 'Infinity',
      editor.setFontSize(17);
      editor.setShowPrintMargin(false);
      editor.session.setTabSize(2);
      editor.session.setUseSoftTabs(true);
    };

    this.defaults = (options = {}) => {
      return _.defaultsDeep(options, {
        useWrapMode: true,
        onLoad: this.onLoadDefault,
        rendererOptions: {
          minLines: 15,
          maxLines: 'Infinity'
        }
      });
    };

  });
