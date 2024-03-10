import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8HWH8qDoNOtIolsSqXUWe7MrMT-rELsI",
  authDomain: "spotify-3e40e.firebaseapp.com",
  projectId: "spotify-3e40e",
  storageBucket: "spotify-3e40e.appspot.com",
  messagingSenderId: "845695152408",
  appId: "1:845695152408:web:63e2e9804aa0dc343c6e6d",
  measurementId: "G-GDBJEQ9397"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);