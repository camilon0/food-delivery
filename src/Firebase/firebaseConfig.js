// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA17LrFCcfAiVpg4NIWSvO6pcXAd7h9d7g",
  authDomain: "fir-register-login-f98c1.firebaseapp.com",
  projectId: "fir-register-login-f98c1",
  storageBucket: "fir-register-login-f98c1.appspot.com",
  messagingSenderId: "160787009003",
  appId: "1:160787009003:web:88fe5663739989e54a1dae",
  measurementId: "G-QY49SH9WSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
