// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/storage";

export const apiKey = "AIzaSyDQhI0LuGiVWagmcX61SUObPdRHDdpYR8w";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "pbl-week2-insta.firebaseapp.com",
  projectId: "pbl-week2-insta",
  storageBucket: "pbl-week2-insta.appspot.com",
  messagingSenderId: "115034834231",
  appId: "1:115034834231:web:c661010499cfd9dc8986b2",
  measurementId: "G-PCVGDQ6VPL",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();

const auth = getAuth();

export { auth, firestore, storage };
