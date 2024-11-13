// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY= "AIzaSyB3VniTtjfuv0PCTF2OQV6oh5wOYxTctxM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN= "app-restaurante-avm.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID= "app-restaurante-avm",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET= "app-restaurante-avm.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID= "922956198754",
  appId: import.meta.env.VITE_FIREBASE_APP_ID= "1:922956198754:web:1b59d681c26789c27cf23b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export {app, db};