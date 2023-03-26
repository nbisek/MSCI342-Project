const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAB0ivKc9yPvNggwowRAo-5TEOElzeyiVY",
  authDomain: "warriorstogether-2d729.firebaseapp.com",
  databaseURL: "https://warriorstogether-2d729-default-rtdb.firebaseio.com/",
  projectId: "warriorstogether-2d729",
  storageBucket: "warriorstogether-2d729.appspot.com",
  messagingSenderId: "332065195184",
  appId: "1:332065195184:web:9d1682b3b19d9efea6e775"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);
