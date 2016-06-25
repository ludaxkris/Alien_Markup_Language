// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Text Scanner
//


function Scanner(content) {

  var _index = 0;
  var _text = content;

  function getIndex() {
    return _index;
  }

  function currentChar() {
    return _text[_index];
  }

  function skipChar(skipCount=1) {
    _index += skipCount;
  }

  function hasChar() {
    return _index < _text.length;
  }

  function nextChar() {
    var char = currentChar();
    skipChar();
    return char;
  }

  function peekChar(skipCount=1) {
    return _text[_index+skipCount];
  }

  return {
    getIndex: getIndex,
    currentChar: currentChar,
    skipChar: skipChar,
    hasChar: hasChar,
    nextChar: nextChar,
    peekChar: peekChar
  };

}

module.exports = Scanner;