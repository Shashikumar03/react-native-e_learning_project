// Import the necessary functions
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
