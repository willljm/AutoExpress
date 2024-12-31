// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYNd_XkS9Cs2Mw2cN6W1hyczJdFEpWK44",
  authDomain: "auto-express-1.firebaseapp.com",
  projectId: "auto-express-1",
  storageBucket: "auto-express-1.firebasestorage.app",
  messagingSenderId: "878688932915",
  appId: "1:878688932915:web:358aad99a2b27e0211bf46",
  measurementId: "G-EG5MBGNTHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };