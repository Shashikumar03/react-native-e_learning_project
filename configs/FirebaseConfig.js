// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAu01mcH5pmxVrMyPR4GrB5guQwLvPkk4",
  authDomain: "react-native-project-429517.firebaseapp.com",
  projectId: "react-native-project-429517",
  storageBucket: "react-native-project-429517.appspot.com",
  messagingSenderId: "1293405443",
  appId: "1:1293405443:web:a6bf627c9c0114c2f6ed36",
  measurementId: "G-RW5JZTSLJT"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
 export const db=getFirestore(app)
