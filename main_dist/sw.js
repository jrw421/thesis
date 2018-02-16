// 'use strict';

// // Install Service Worker
// self.addEventListener('install', function(event){
//   console.log('service worker installed!');
// });

// // Service Worker Active
// self.addEventListener('activate', function(event){
//   console.log('service worker activated!');
// });

// self.addEventListener('message', function(event){
//   console.log("SW Received Message: " + event.data);
// });

// self.addEventListener('push', function(event) {
//   console.log('[Service Worker] Push Received.');
//   console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//   const title = 'Check it Out!!!';
//   const options = {
//     body: `${event.data.text()}`,
//   };

//   const notificationPromise = self.registration.showNotification(title, options);
//   event.waitUntil(notificationPromise);
// });

// self.addEventListener('notificationclick', function(event) {
//   console.log('[Service Worker] Notification click Received.');

//   event.notification.close();
// });