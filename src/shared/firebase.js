// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQhI0LuGiVWagmcX61SUObPdRHDdpYR8w",
  authDomain: "pbl-week2-insta.firebaseapp.com",
  projectId: "pbl-week2-insta",
  storageBucket: "pbl-week2-insta.appspot.com",
  messagingSenderId: "115034834231",
  appId: "1:115034834231:web:c661010499cfd9dc8986b2",
  measurementId: "G-PCVGDQ6VPL",
};

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
