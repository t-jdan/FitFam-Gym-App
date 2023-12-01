// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import for Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import for Firebase Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXHUm36x-ygnNB3iT_5LFlwi_bW4NwMCM",
  authDomain: "fitfam-be65f.firebaseapp.com",
  databaseURL: "https://fitfam-be65f-default-rtdb.firebaseio.com",
  projectId: "fitfam-be65f",
  storageBucket: "fitfam-be65f.appspot.com",
  messagingSenderId: "728129279743",
  appId: "1:728129279743:web:7cb7257ede5da26cbb1eca",
  measurementId: "G-1VFKFFHZ7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);

// Initialize Firestore and export
export const db = getFirestore(app);
