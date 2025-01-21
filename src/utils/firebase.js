// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz7h8PF0tmXSlXGYQ85Xj8byIstNV-aWA",
  authDomain: "alsaad-93f0e.firebaseapp.com",
  projectId: "alsaad-93f0e",
  storageBucket: "alsaad-93f0e.firebasestorage.app",
  messagingSenderId: "177591430885",
  appId: "1:177591430885:web:8f0c8f197fa5d8a8edae0c",
  measurementId: "G-YXNL9G560K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, provider, facebookProvider };