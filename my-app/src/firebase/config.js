// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL6XsYG7JvCmX5yDDCJFinJNHT1hM6wNM",
  authDomain: "tpfinalprog3-6cb12.firebaseapp.com",
  projectId: "tpfinalprog3-6cb12",
  storageBucket: "tpfinalprog3-6cb12.appspot.com",
  messagingSenderId: "274598222932",
  appId: "1:274598222932:web:52ce64ba5727e7c7f3e1c1"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();