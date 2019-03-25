// Initialize Firebase
var config = {
    apiKey: "AIzaSyDygjyH6lFdEQ8g-ppn9pBZM8xjkcdzin4",
    authDomain: "traintime-3e2c9.firebaseapp.com",
    databaseURL: "https://traintime-3e2c9.firebaseio.com",
    projectId: "traintime-3e2c9",
    storageBucket: "traintime-3e2c9.appspot.com",
    messagingSenderId: "355957977261"
  };
  firebase.initializeApp(config);

  let db = firebase.firestore()