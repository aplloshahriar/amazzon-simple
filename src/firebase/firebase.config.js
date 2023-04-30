// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFTL5eoDBDwVouZkDhfjTTGV3fljGfzLg",
  authDomain: "amazzon-firebase-auth.firebaseapp.com",
  projectId: "amazzon-firebase-auth",
  storageBucket: "amazzon-firebase-auth.appspot.com",
  messagingSenderId: "137360631386",
  appId: "1:137360631386:web:9eafd21944c8d38f345a63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;