// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Queue
//


var _  = require("underscore");


function AMLQueue() {
  var _queue = [];
  var _reinsertBuffer = [];


  function push(value) {
    _queue.push(value);
  }

  function popUntilCurrentChar(aml_element) {
    if(_.contains(_queue, aml_element)) {
      for(var currentChar = _queue.pop(); currentChar != aml_element; currentChar = _queue.pop()) {
        _reinsertBuffer.push(currentChar);
      }
    } else {
      throw "Open tag never present.";
    }
  }

  function peek() {
    if(_queue.length > 0) {
      return _queue[_queue.length-1];
    } else {
      return;
    }
  }

  function getAndClearReinsertBuffer() {
    var buffer = _reinsertBuffer;
    _reinsertBuffer = [];
    return buffer;
  }

  return {
    push: push,
    popUntilCurrentChar: popUntilCurrentChar,
    peek: peek,
    getAndClearReinsertBuffer: getAndClearReinsertBuffer
  };
}


module.exports = AMLQueue;