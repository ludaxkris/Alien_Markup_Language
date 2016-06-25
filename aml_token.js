// Chris Tung
// 6/11/2016
// AML to HTML Translator

//
// AML Element mapping
//


// Tag Structure
var aml_open_tag    = "^{0}",
    aml_close_tag   = "^!{0}",
    html_open_tag   = "<{0}>",
    html_close_tag  = "</{0}>";


// Tag identifers
var aml_open_tag_token    = "^",
    aml_close_tag_token   = "!";


// Tag mapping
var aml_html_mapping = {
  "%" : "strong",
  "~" : "em"
};

var aml_tag_id_list = Object.keys(aml_html_mapping);


function getHTMLOpenTag(tokenKey) {
  return html_open_tag.replace("{0}", aml_html_mapping[tokenKey]);
}

function getHTMLCloseTag(tokenKey) {
  return html_close_tag.replace("{0}", aml_html_mapping[tokenKey]);
}

module.exports = {
  aml_open_tag_token: aml_open_tag_token,
  aml_close_tag_token: aml_close_tag_token,
  aml_tag_id_list: aml_tag_id_list,
  getHTMLOpenTag: getHTMLOpenTag,
  getHTMLCloseTag: getHTMLCloseTag
};


