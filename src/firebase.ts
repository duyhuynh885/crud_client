// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC45Yq3cnyouXfL9v-r-JCyc7K6VIKHwzc",
  authDomain: "crud-6e15f.firebaseapp.com",
  projectId: "crud-6e15f",
  storageBucket: "crud-6e15f.appspot.com",
  messagingSenderId: "232198561824",
  appId: "1:232198561824:web:b49dc578f0f9516a63dc45",
  measurementId: "G-CEMP0262TR",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();

export { storage, firebase as default };
