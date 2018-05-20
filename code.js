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

function initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("submitValuesToSlack")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

// Trigger this on Form Submit
function submitValuesToSlack(e) {
  // Test code. uncomment to debug in Google Script editor
  // if (typeof e === "undefined") {
  //   e = {namedValues: {"Question1": ["answer1"], "Question2" : ["answer2"]}};
  //   messagePretext = "Debugging our Sheets to Slack integration";
  // }

  var attachments = constructAttachments(e.namedValues);

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

var constructAttachments = function(namedValues) {
  var fields = makeFields(namedValues);

  var attachments = [{
    "fallback" : messageFallback,
    "pretext" : messagePretext,
    "mrkdwn_in" : ["pretext"],
    "color" : postColor,
    "fields" : fields
  }]

  return attachments;
}

var makeFields = function(namedValues) {
  var fields = [];

  var keys = getKeys(namedValues);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = namedValues[key][0];
    fields.push(makeField(key, value));
  }

  return fields;
}

var makeField = function(question, answer) {
  var field = {
    "title" : question,
    "value" : answer,
    "short" : false
  };
  return field;
}

var getKeys = function(namedValues) {
  var keys = [];
  for (var key in namedValues) {
    if (namedValues.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}
