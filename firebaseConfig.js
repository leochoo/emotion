// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrtdJQH39ilyyvkg9ATp8Q63LtOu0vl8g",
  authDomain: "team-emotion.firebaseapp.com",
  projectId: "team-emotion",
  storageBucket: "team-emotion.appspot.com",
  messagingSenderId: "682789369644",
  appId: "1:682789369644:web:d9f4261d88f9cb48f91e89",
  measurementId: "G-8QBGZ9CBBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
