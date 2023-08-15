// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDztTp6_386-E6JZfWKw4mIacqRXTZLDpo",
  authDomain: "dbocados-website.firebaseapp.com",
  projectId: "dbocados-website",
  storageBucket: "dbocados-website.appspot.com",
  messagingSenderId: "183813886869",
  appId: "1:183813886869:web:6b671dee585426d8115c9c",
  measurementId: "G-VPZ6V3YFKJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp