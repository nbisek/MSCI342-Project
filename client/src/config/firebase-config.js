import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB0ivKc9yPvNggwowRAo-5TEOElzeyiVY",
  authDomain: "warriorstogether-2d729.firebaseapp.com",
  databaseURL: "https://warriorstogether-2d729-default-rtdb.firebaseio.com/",
  projectId: "warriorstogether-2d729",
  storageBucket: "warriorstogether-2d729.appspot.com",
  messagingSenderId: "332065195184",
  appId: "1:332065195184:web:9d1682b3b19d9efea6e775"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
