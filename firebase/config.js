import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

// Configuraciones adicionales para el auth
auth.useDeviceLanguage();

export { auth };