// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Allows you to connect to the database
import { getFirestore } from "firebase/firestore";

// For Auth
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsTDaMY3-jia5dIXt0tWGeqT_OmYZBJfw",
  authDomain: "sweet-berries-cookies-sc-cb7d5.firebaseapp.com",
  projectId: "sweet-berries-cookies-sc-cb7d5",
  storageBucket: "sweet-berries-cookies-sc-cb7d5.appspot.com",
  messagingSenderId: "821895876084",
  appId: "1:821895876084:web:5c99d2ba5a37ddcd183da1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up database and export it
export const db = getFirestore(app);

// Set up auth and export it
export const auth = getAuth(app);