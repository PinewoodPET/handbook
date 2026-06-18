<img src="https://github.com/PinewoodPET/handbook/blob/main/assets/petlogo.png?raw=true" alt="PET Logo" width="200"/>

# PET Handbook

## Making changes to the handbook

- Follow the Discourse/Devforum formatting
- For images, upload your image to `assets/`, grab the GitHub raw URL, and use that.

## Generating the DevForum User API Key

1. Run the `usertoken.py` script to generate a new User API Key for DevForum. Make sure you're logged into the HandbookPET account not your own account.

2. After you get the API Key, go to repo settings, open "Secrets and variables" -> "Actions" and replace or add the new key as `DEVFORUM_API_KEY`.
