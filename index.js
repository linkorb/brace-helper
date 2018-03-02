var ace = require('brace');

function braceHelper() {
  var selector = '.ace-editor', defaultTheme = 'monokai', defaultMode = 'html', defaultLines = 10;

  // details: https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  [...document.querySelectorAll(selector)].forEach(function(element, index) {
    var editor;
    var mode = element.dataset.mode || defaultMode;
    var theme = element.dataset.theme || defaultTheme;
    var lines = element.dataset.lines || defaultLines;

    if (element.tagName == 'TEXTAREA') {
        var div = document.createElement('div');
        div.id = 'ace_editor' + index;
        element.parentNode.insertBefore(div, element);
        editor = ace.edit(div.id);
        editor.setValue(element.value, -1);
        editor.getSession().on('change', function(){
            element.value = editor.getSession().getValue();
        });
        element.style.display = 'none';
    } else {
        editor = ace.edit(element);
    }

    editor.setTheme('ace/theme/'+theme);
    editor.getSession().setMode('ace/mode/'+mode);
    editor.setOptions({
        minLines: lines,
        maxLines: lines
    });
  });
}

document.addEventListener("DOMContentLoaded", braceHelper);
