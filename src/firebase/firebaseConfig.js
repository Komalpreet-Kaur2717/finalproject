// src/firebase/firebaseConfig.js
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// You only need config if it's not auto-detected from `google-services.json`
const firebaseConfig = {
  apiKey: "AIzaSyClCJQ4nUAhgtxnKBfAgwneIKMFHh2jEJI",
  authDomain: "finalproject-e9b69.firebaseapp.com",
  projectId: "finalproject-e9b69",
  storageBucket: "finalproject-e9b69.firebasestorage.app",
  messagingSenderId: "1077605605199",
  appId: "1:1077605605199:web:e3ca121ec134828f08af3a",
  measurementId: "G-XZ0194DYXH"
};

// Initialize only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };
