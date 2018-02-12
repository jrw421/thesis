// console.log('axios', axios); 

const applicationServerPublicKey = 'BL0Dx9ssxxQUkvCP85K9cDx6e' +
  'RRvXnnPBEOli3GlWxhLNfv2sDeFv0I3B_kUlWUbYKnCg5_EY7_Z4JJxddm9AKg';

const appServKey = urlB64ToUint8Array(applicationServerPublicKey);

let isSubscribed = false;
let swRegistration = null;


// // conversion helper for the public key
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

}

function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if(permissionResult === 'granted') {
      subscribeUserToPush()
    }
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

function subscribeUserToPush() {
  return navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    axios.get('/user')
    .then(response => {
      const userId = response.data.user.id;
      console.log('user info from SERVICE WORKER', response.data.user.id);
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: appServKey
      };
    /////////////////////// promise that attaches the result of subscribe to an object then passes combined obj to next
      let promise1 = userId;
      let promise2 = registration.pushManager.subscribe(subscribeOptions);
      return Promise.all([promise1, promise2]).then(values => {
        let subscriptionWithID = {}
        subscriptionWithID["userId"] = values[0];
        subscriptionWithID["subscription"] = values[1];
        console.log('Has the user id and subscription?', subscriptionWithID);
        sendSubscriptionToBackEnd(subscriptionWithID);
      })
    })
  });
}

function sendSubscriptionToBackEnd(subscription) {
  console.log('sending push subscription to the server', subscription)
  return fetch('/api/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  .then(function(response) {
    console.log('response from server', response)
    // console.log('response.json?', response.json());
  });
}

function initialize() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    // sendSubscriptionToBackEnd(subscription);
    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }
  });
};

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);     
    swRegistration = swReg;
    initialize();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
}


askPermission();