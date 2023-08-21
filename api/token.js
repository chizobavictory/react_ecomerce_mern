// http://localhost/?code=4/0Adeu5BUEeGy3Z0oBqkr2D3q46-ytSa0FfHihwOO2A5-fU1ZsHezJRd_ETWlXQDCJkgyvSw&scope=https://www.googleapis.com/auth/gmail.send

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require('./credentials.json');

// Replace with the code you received from Google
const code = '4/0Adeu5BVWwXIAOrbGOzNBxEu-Ezg6Mg_vVRUvpXRuMnrVhDIuyLEk0oggVcjs3wQ-dlieLw'
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.getToken(code).then(({ tokens }) => {
  const tokenPath = path.join(__dirname, 'token.json');
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  console.log('Access token and refresh token stored to token.json');
});