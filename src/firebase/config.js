import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyB7L9NQ4WC5LzvC39SjgmZJg4cYRETSD4E",
  authDomain: "yury-ecommerce.firebaseapp.com",
  projectId: "yury-ecommerce",
  storageBucket: "yury-ecommerce.appspot.com",
  messagingSenderId: "1002819702727",
  appId: "1:1002819702727:web:6f880163c2345185ec93e2",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
