import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAxhvD_nwwQTfau6PCWUAL8eIVf7iHp898",
  authDomain: "hostly-f1a06.firebaseapp.com",
  databaseURL: "https://hostly-f1a06.firebaseio.com",
  projectId: "hostly-f1a06",
  storageBucket: "",
  messagingSenderId: "115584619680"
};

firebase.initializeApp(config);
export default firebase;
