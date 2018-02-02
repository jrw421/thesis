// import $ from 'jquery';
//
// var clientId = 'XXX';
// var apiKey = 'AIzaSyDY6W23xMu7ct8KPcCnM-7HD_DiqgK0XI0';
// var scopes = 'https://www.google.com/m8/feeds';
//
// $(document).on('click', '.js-google_contacts', function() {
//    gapi.client.setApiKey(apiKey);
//    window.setTimeout(checkAuth, 3);
// });
//
// function checkAuth() {
//   gapi.auth.authorize({
//     client_id: clientId,
//     scope: scopes,
//     immediate: false
//   }, handleAuthResult);
// }
//
// function handleAuthResult(authResult) {
//   if (authResult && !authResult.error) {
//     $.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' +
//            authResult.access_token + '&max-results=700&v=3.0',
//       function(response) {
//          //Handle Response
//       });
//   }
// }
