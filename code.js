// This Google Sheets script will post to a slack channel when a user submits data to a Google Forms Spreadsheet
// View the README for installation instructions. Don't forget to add the required slack information below.

// Source: https://github.com/markfguerra/google-forms-to-slack

/////////////////////////
// Begin customization //
/////////////////////////

// Alter this to match the incoming webhook url provided by Slack
var slackIncomingWebhookUrl = 'https://hooks.slack.com/services/YOUR-URL-HERE';

// Include # for public channels, omit it for private channels
var postChannel = "YOUR-CHANNEL-HERE";

var postIcon = ":mailbox_with_mail:";
var postUser = "Form Response";
var postColor = "#0000DD";

var messageFallback = "The attachment must be viewed as plain text.";
var messagePretext = "A user submitted a response to the form.";

///////////////////////
// End customization //
///////////////////////

// In the Script Editor, run initialize() at least once to make your code execute on form submit
function initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("submitValuesToSlack")
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}

// Running the code in initialize() will cause this function to be triggered this on every Form Submit
function submitValuesToSlack(e) {
  // Test code. uncomment to debug in Google Script editor
  // if (typeof e === "undefined") {
  //   e = {namedValues: {"Question1": ["answer1"], "Question2" : ["answer2"]}};
  //   messagePretext = "Debugging our Sheets to Slack integration";
  // }

  var attachments = constructAttachments(e.values);

  var payload = {
    "channel": postChannel,
    "username": postUser,
    "icon_emoji": postIcon,
    "link_names": 1,
    "attachments": attachments
  };

  var options = {
    'method': 'post',
    'payload': JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(slackIncomingWebhookUrl, options);
}

// Creates Slack message attachments which contain the data from the Google Form
// submission, which is passed in as a parameter
// https://api.slack.com/docs/message-attachments
var constructAttachments = function(values) {
  // var fields = makeFields(values);
  // The makeFields function seems buggy in the 
  // new verison, so just comment them out temporarily 

  var attachments = [{
    "fallback" : messageFallback,
    "pretext" : messagePretext,
    //"mrkdwn_in" : ["pretext"],
    "color" : postColor,
    //"fields" : fields
  }]

  return attachments;
}

// Creates an array of Slack fields containing the questions and answers
var makeFields = function(values) {
  var fields = [];

  var columnNames = getColumnNames();

  for (var i = 0; i < columnNames.length; i++) {
    var colName = columnNames[i];
    var val = values[i];
    fields.push(makeField(colName, val));
  }

  return fields;
}

// Creates a Slack field for your message
// https://api.slack.com/docs/message-attachments#fields
var makeField = function(question, answer) {
  var field = {
    "title" : question,
    "value" : answer,
    "short" : false
  };
  return field;
}

// Extracts the column names from the first row of the spreadsheet
var getColumnNames = function() {
  var sheet = SpreadsheetApp.getActiveSheet();

  // Get the header row using A1 notation
  var headerRow = sheet.getRange("1:1");

  // Extract the values from it
  var headerRowValues = headerRow.getValues()[0];

  return headerRowValues;
}
