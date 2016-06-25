// Chris Tung
// 6/11/2016
// AML to HTML Translater

//
// AML Tester
//

var translateModule = process.argv[2];

// Make the 'document' global available, in case it is needed.
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
global.document = mock.getDocument();

var AMLTranslator = require(translateModule);

var errorMessage = "Error";

var testStrings = [
   ["Hello, World!",
    "Hello, World!"],
   ["Hello, ^%World!^!%",
    "Hello, <STRONG>World!</STRONG>"],
   ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."],

   ["^%Whiskey ^~Tango^!% Foxtrot^!~.",
    "<STRONG>Whiskey <EM>Tango</EM></STRONG><EM> Foxtrot</EM>."],
   ["Bad ^ tag should not ^! break translator.",
    "Bad ^ tag should not ^! break translator."],
   ["Consecutive open tags ^% should throw error ^% ^!% ^!%",
    errorMessage],
   ["Too many close tags ^% should throw error ^!% ^!% ^!%",
    errorMessage],
   ["Never had open tag should throw error ^!%",
    errorMessage],
   ["^%Crazy^~ Test ^% should ^~ be ^!% okay ^!~ in my ^!~ eyes^!%.",
    "<strong>Crazy<em> Test <strong> should <em> be </em></strong><em> okay </em> in my </em> eyes</strong>."],
];

function printErrorLogs(idx, testStrings, expected, received) {
  console.log("Example " + (idx + 1) + " incorrect:");
  console.log(testStrings);
  console.log("");
  console.log("Expected:");
  console.log(expected);
  console.log("Received:");
  console.log(received);
}

testStrings.forEach(function(val, idx, array) {
  try {
    translated = AMLTranslator.translate(val[0]);
    if (translated.toLowerCase() != val[1].toLowerCase()) {
      printErrorLogs(idx, val, val[1], translated);
    } else {
      console.log("Example " + (idx + 1) + " correct.");
    }
  }
  catch (err) {
    if(val[1] == errorMessage) {
      console.log("Example " + (idx + 1) + " correct.");
    } else {
      printErrorLogs(idx, val, val[1], err);
    }
  }
});
