// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyASpf7pYj5y2QFPg1XsmhZeg0Tjgw23Qbo",
  authDomain: "ai-trip-5fecb.firebaseapp.com",
  projectId: "ai-trip-5fecb",
  storageBucket: "ai-trip-5fecb.appspot.com",
  messagingSenderId: "822409245743",
  appId: "1:822409245743:web:deb914af74b88491aa82da",
  measurementId: "G-FFTK45NSSJ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
