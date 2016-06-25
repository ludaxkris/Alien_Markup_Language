// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Text Builder
//

function TextBuilder() {
  var _text = [];

  function insertText(value) {
    _text.push(value);
  }

  function exportText() {
    return _text.join('');
  }

  return {
    insertText: insertText,
    exportText: exportText
  };
}


module.exports = TextBuilder;