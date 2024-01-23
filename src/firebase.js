// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEDLr4BxBo8YyUf45RXhOkDCpTacG_NZk",
  authDomain: "iskavt-26f75.firebaseapp.com",
  projectId: "iskavt-26f75",
  storageBucket: "iskavt-26f75.appspot.com",
  messagingSenderId: "144294742765",
  appId: "1:144294742765:web:ffdcc34719c2e9a5a21ae4",
  measurementId: "G-C8WMGYH1QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, ref, getDownloadURL, analytics }; 