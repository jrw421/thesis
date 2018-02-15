var google = require('googleapis');
var { OAuth2Client }  = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;
var calendar = google.calendar('v3');
var clientId = '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com'
var clientSecret = '4qDzcSsqkWieHEABXAf1XMpH'
const db = require('../ControllersDB/mainController.js');

async function addToCal(event, user_id, host){
  var wait = new Promise((reject, resolve) => {
    db.user.getUserById(user_id, function(err, res){
      if(err){
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
  
  var user = await wait.then(x => x).catch(x => x)

  var { description, name, location, dateTimeStart, id} = event

  var auth = new OAuth2Client(clientId, clientSecret, '');
  var oauth = new OAuth2(clientId, clientSecret, '')

  oauth.credentials = {access_token : user.accessToken, refresh_token : user.refreshToken}

  if (!host){
  var hashed = new Promise((reject, resolve) => {
    db.user.getHashForUser(user_id, id, function(err, res){
      if(err){
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
    hashed.then(hash => {
      url = `http://localhost:4000/eventPage/${hash}` 
    var event = {
      'summary': name,
      'location': location,
      'description': description,
      'start': {
        'dateTime': dateTimeStart,
      },
      'end': {
        'dateTime': dateTimeStart,
      },
      'colorId' : 3,  
      'source' : {
        'title' : 'View event on Host.ly', 
        'url' : url
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60 * 2},
          {'method': 'popup', 'minutes': 120},
        ],
    },
  };

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
    }).catch(err => {
        if (err.length === 40){
        url = `http://localhost:4000/eventPage/${err}` 
        
        var event = {
          'summary': name,
          'location': location,
          'description': description,
          'start': {
            'dateTime': dateTimeStart,
          },
          'end': {
            'dateTime': dateTimeStart,
          },
          'colorId' : 3,  
          'source' : {
            'title' : 'View event on Host.ly', 
            'url' : url
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60 * 2},
              {'method': 'popup', 'minutes': 120},
            ],
        },
      };

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
        }
    })
  } else {
    url = `http://localhost:4000/` 
     var event = {
      'summary': name,
      'location': location,
      'description': description,
      'start': {
        'dateTime': dateTimeStart,
      },
      'end': {
        'dateTime': dateTimeStart,
      },
      'colorId' : 3,  
      'source' : {
        'title' : 'View event on Host.ly', 
        'url' : url
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60 * 2},
          {'method': 'popup', 'minutes': 120},
        ],
    },
  };

      calendar.events.insert({
          auth: oauth,
          calendarId: 'primary',
          resource: event,
        }, function(err, event) {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return err;
          }
        console.log('Event created: %s', event.htmlLink);
      })
  }
}

module.exports = addToCal