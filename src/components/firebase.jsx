// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKWU0UtxZfyv9ATmLZi10F92IDVzGpz_k",
  authDomain: "login-auth-86970.firebaseapp.com",
  projectId: "login-auth-86970",
  storageBucket: "login-auth-86970.appspot.com",
  messagingSenderId: "586220856237",
  appId: "1:586220856237:web:b40bff4c32eb92d3f3b724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db =  getFirestore(app);
export default app;