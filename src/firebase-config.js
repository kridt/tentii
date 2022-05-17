import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  /* apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId, */
  apiKey: "AIzaSyC3UPwqSIYRm6t-RmFFdi-Lfttp7YHkXvw",
  authDomain: "tento-92d06.firebaseapp.com",
  projectId: "tento-92d06",
  storageBucket: "tento-92d06.appspot.com",
  messagingSenderId: "21821140314",
  appId: "1:21821140314:web:3b38b054a78a003961d763",
  measurementId: "G-4C9N6B24XT"
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export default app;
