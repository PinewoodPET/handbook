<img src="https://github.com/PinewoodPET/handbook/blob/main/assets/petlogo.png?raw=true" alt="PET Logo" width="200"/>

# PET Handbook

## Pull requests

- PR's may be created to correct mistakes, or if necessary simplify/reword handbook language. Suggestions should be directed to the discord forum

## Making changes to the handbook

- Follow the Discourse/Devforum formatting
- For images, upload your image to `assets/`, grab the GitHub raw URL, and use that.

## Generating the DevForum User API Key

1. Run the `usertoken.py` script to generate a new User API Key for DevForum. Make sure you're logged into the HandbookPET account not your own account.

2. After you get the API Key, go to repo settings, open "Secrets and variables" -> "Actions" and replace or add the new key as `DEVFORUM_API_KEY`.

3. Get the devforum post ID by appending .json to the end of the post url, copy the ID field in the json, go to "Variables" and replace or add the `DEVFORUM_POST_ID` variable with the copied id.
