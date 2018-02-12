var google = require('googleapis');
var { OAuth2Client }  = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;
var refreshToken = '1/nom8spYHSl6NA4qJ6-4Y9wyrZ-BlgwBCBUCgc3JNl5Y'
var accessToken = 'ya29.GlxeBbVnj1kiFQv7hl11ziBPo-bg6nnRqVxw5DC22-mo6v45lOnyQJGEi1L6z_9V9Yyexst4k4sJenVPOCu-MmZEYdSa0oS_42xSRXvcMWjd6znBlN7JRZu9dyYu0Q'
var calendar = google.calendar('v3');
var clientId = '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com'
var clientSecret = '4qDzcSsqkWieHEABXAf1XMpH'


var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2018-02-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2018-02-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'attendees': [
    {'email': 'cmourani12@yahoo.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};


var auth = new OAuth2Client(clientId, clientSecret, '');
var oauth = new OAuth2(clientId, clientSecret, '')

oauth.credentials = {access_token : accessToken, refresh_token : refreshToken}

calendar.events.insert({
  auth: oauth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});


