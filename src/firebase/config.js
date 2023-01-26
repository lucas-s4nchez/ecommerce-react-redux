import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

//Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyB7L9NQ4WC5LzvC39SjgmZJg4cYRETSD4E",
//   authDomain: "yury-ecommerce.firebaseapp.com",
//   projectId: "yury-ecommerce",
//   storageBucket: "yury-ecommerce.appspot.com",
//   messagingSenderId: "1002819702727",
//   appId: "1:1002819702727:web:6f880163c2345185ec93e2",
// };
//Testing
const firebaseConfig = {
  apiKey: "AIzaSyCnx1da_wseRj93VsYlwVSgfLDg2wtzXJk",
  authDomain: "react-testing-412f9.firebaseapp.com",
  projectId: "react-testing-412f9",
  storageBucket: "react-testing-412f9.appspot.com",
  messagingSenderId: "407229943033",
  appId: "1:407229943033:web:c8bc607c0ce108a5d46628",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
