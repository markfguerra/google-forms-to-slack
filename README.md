# Google Forms To Slack

Do you have a Google Form? Did you ever wish that you could get a Slack message when someone submits the Google Form? Great, because that is exactly what this script does.

## Technology Info
 - This script is a web service client to the Slack Incoming Webhook API; it posts slack messsages using HTTP Post.
 - This is a Google Apps script. That is, a JavaScript environment that can automate Google Drive products such as Google Sheets and Google Forms. It also comes with a neat browser based IDE. https://developers.google.com/apps-script/

## Setup
You'll need a few things
- A Google Sheet attached to your Google Form.
- An Incoming Webhook integration for your Slack channel. Set this up in Slack and make note of the URL it provides, you'll need it. https://api.slack.com/incoming-webhooks

Procedure
 - Open your Google Forms Spreadsheet.
 - In the menu, click on "Extensions" -> "Apps Script".
 - Paste the code.js script into the Script Editor.
 - Edit the code you pasted to include the Slack Incoming Webhook URL in the customizations block; change the variable `slackIncomingWebhookUrl` and then set your channel name in the variable `postChannel`. Save.
 - Set up the event triggers by running the `initialize()` function. In the Script Editor's menu bar, select the function `initialize` and click Run. Agree to any permission requests.
 - You're done! Try it out by submitting a response to your Google Form. If successful, you'll see a new message in your slack channel.
