// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "find-home-f9f10.firebaseapp.com",
  projectId: "find-home-f9f10",
  storageBucket: "find-home-f9f10.appspot.com",
  messagingSenderId: "343397267432",
  appId: "1:343397267432:web:e74e992604e3369e2e565d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);