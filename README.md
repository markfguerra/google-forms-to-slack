# Google Forms To Slack

Do you have a Google Form? Did you ever wish that you could get a Slack message when someone submits the Google Form? Great, because that is exactly what this script does.

## Technology Info
 - This script is a web service client to the Slack Incoming Webhook API; it posts slack messsages using HTTP Post.
 - This is a Google Apps script. That is, a JavaScript environment that can automate Google Drive products such as Google Sheets and Google Forms. It also comes with a neat browser based IDE. https://developers.google.com/apps-script/

## Setup
You'll need a few things
- A Google Sheet attached to your Google Form.
- An Incoming Webhook integration for your Slack channel. Set this up in Slack, and make note of the URL it provides. You'll need it.

Procedure
 - Open your Google Forms Spreadsheet.
 - In the menu, click on "Tools" -> "Script Editor".
 - Paste the code.js script into the Script Editor.
 - Edit the code you pasted to include the Slack Incoming Webhook URL in the customizations block; change the variable `slackIncomingWebhookUrl`. Also, set your channel name in `postChannel`.
 - In the menu for the script editor, Click "Resources" -> "All your triggers". You may be prompted to choose a project name, do so if necessary.
 - Agree to any permission requests.
 - Remove the existing trigger if you have one and click "Add new trigger". 
 - Use these values for your trigger, if it is not already there: `submitValuesToSlack` `From spreadsheet` `On form submit`
 - You're done. Try it out.
