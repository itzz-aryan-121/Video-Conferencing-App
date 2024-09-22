// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5QYn4WUnTcgAYRBg03Ep-MypLXiXIF34",
  authDomain: "boom-clone-ad18e.firebaseapp.com",
  projectId: "boom-clone-ad18e",
  storageBucket: "boom-clone-ad18e.appspot.com",
  messagingSenderId: "129952661052",
  appId: "1:129952661052:web:5258c143372ed40f6b0d39",
  measurementId: "G-H1P9D60TSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");