import * as firebase from "firebase";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "<AIzaSyDxe3Adw94y0kEaoyUckhJRPYV8kaHLQ8o>",
  authDomain: "aacf2-dc0b9.firebaseapp.com",
  databaseURL: "https://aacf2-dc0b9.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};
export const firebaseRef = firebase.initializeApp(config);