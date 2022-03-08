import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUIUzA51QHk4GhgSMdL_oYw2zepXihKiM",
  authDomain: "journal-app-bac9d.firebaseapp.com",
  projectId: "journal-app-bac9d",
  storageBucket: "journal-app-bac9d.appspot.com",
  messagingSenderId: "1066675860273",
  appId: "1:1066675860273:web:a68fdbc488e74e86f4f610",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
