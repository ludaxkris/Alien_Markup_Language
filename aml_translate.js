// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Module
//

var _             = require("underscore");

var Scanner       = require("./aml_scanner");
var TextBuilder   = require("./aml_text_builder");
var Queue         = require("./aml_queue");
var Parser        = require("./aml_parser");



function translate (text) {
  var text_builder = new TextBuilder();
  var aml_queue = new Queue();

  scanner(text, text_builder, aml_queue);

  return text_builder.exportText();
}

function scanner (text, text_builder, aml_queue) {
  var aml_scanner = new Scanner(text);
  var aml_parser = new Parser(aml_scanner, text_builder, aml_queue);

  while(aml_scanner.hasChar()) {
    aml_parser.parse();
    aml_scanner.nextChar();
  }
}


module.exports = {
  translate: translate
};