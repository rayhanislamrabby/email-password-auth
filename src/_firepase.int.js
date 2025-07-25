// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr4OVxUP9klNUEB-uo_JAbJPJeeNflUYE",
  authDomain: "email-password-auth-c607e.firebaseapp.com",
  projectId: "email-password-auth-c607e",
  storageBucket: "email-password-auth-c607e.firebasestorage.app",
  messagingSenderId: "87296451560",
  appId: "1:87296451560:web:5e270e951a0b6013d57a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);