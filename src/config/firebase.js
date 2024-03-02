// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8HWH8qDoNOtIolsSqXUWe7MrMT-rELsI",
  authDomain: "spotify-3e40e.firebaseapp.com",
  projectId: "spotify-3e40e",
  storageBucket: "spotify-3e40e.appspot.com",
  messagingSenderId: "845695152408",
  appId: "1:845695152408:web:63e2e9804aa0dc343c6e6d",
  measurementId: "G-GDBJEQ9397"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);