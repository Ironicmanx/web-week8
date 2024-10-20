
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_-L-3qPqvh1t5tHM1zapTR4e-YRUN-_k",
  authDomain: "shoppinglist-269ca.firebaseapp.com",
  projectId: "shoppinglist-269ca",
  storageBucket: "shoppinglist-269ca.appspot.com",
  messagingSenderId: "799529638466",
  appId: "1:799529638466:web:6312d2b887ea9f8b592bdb",
  measurementId: "G-YDK3Z8D08T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { db }; // Export Firestore instance
