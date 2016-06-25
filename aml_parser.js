// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Parser
//

var _             = require("underscore");

var aml_token     = require("./aml_token");


function AMLParser(scanner, text_builder, queue) {
  var aml_scanner = scanner;
  var text_builder = text_builder;
  var aml_queue = queue;

  function parse() {
    var currentChar = aml_scanner.currentChar();

    switch(currentChar) {
      case aml_token.aml_open_tag_token: {
        var nextChar = aml_scanner.peekChar();

        if (nextChar == aml_token.aml_close_tag_token) {
          var thirdChar = aml_scanner.peekChar(2);

          if (_.contains(aml_token.aml_tag_id_list, thirdChar)) {
            processCloseTag(thirdChar);
            break;
          }
        }
        else if (_.contains(aml_token.aml_tag_id_list, nextChar)) {
          processOpenTag(nextChar);
          break;
        }
        // Else not qualifying tag - do nothing
      }
      default: {
        text_builder.insertText(currentChar);
        break;
      }
    }
  }

  function processCloseTag(aml_element_char) {
    aml_queue.popUntilCurrentChar(aml_element_char);
    insertCloseTags(aml_element_char);
    aml_scanner.skipChar(2);
  }

  function processOpenTag(aml_element_char) {
    insertOpenTag(aml_element_char);
    text_builder.insertText(aml_token.getHTMLOpenTag(aml_element_char));
    aml_scanner.skipChar();
  }

  // Insert all close tags to other tags before insert current close tag
  // Then insert opens tags previously closed.
  function insertCloseTags(aml_element_char) {
    var existingOpenTags = aml_queue.getAndClearReinsertBuffer().reverse();

    _.each(existingOpenTags, function(openTagToken) {
      text_builder.insertText(aml_token.getHTMLCloseTag(openTagToken));
    });

    text_builder.insertText(aml_token.getHTMLCloseTag(aml_element_char));

    _.each(existingOpenTags, function(openTagToken) {
      text_builder.insertText(aml_token.getHTMLOpenTag(openTagToken));
      aml_queue.push(openTagToken);
    });
  }

  function insertOpenTag(aml_element_char) {
    var previousTag = aml_queue.peek();
    if(previousTag && previousTag == aml_element_char) {
      throw "Too many consecutive open tags.";
    } else {
      aml_queue.push(aml_element_char);
    }
  }

  return {
    parse: parse
  };
}


module.exports = AMLParser;

