import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAExnuzEvFmEGoAXTZFlogJDd1RpQT3p60",
  authDomain: "fir-6aaad.firebaseapp.com",
  projectId: "fir-6aaad",
  storageBucket: "fir-6aaad.appspot.com",
  messagingSenderId: "575562392466",
  appId: "1:575562392466:web:0f5c99874f2ea84b7e574b",
  measurementId: "G-VT54E7EDW6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
