// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDQVQ6sC1WsQMlMyMPri3Vp3QO44hyAx4",
  authDomain: "chatla-bac33.firebaseapp.com",
  databaseURL: "https://chatla-bac33.firebaseio.com",
  projectId: "chatla-bac33",
  storageBucket: "chatla-bac33.appspot.com",
  messagingSenderId: "583838802771",
  appId: "1:583838802771:web:7df343cc89543134a137a6",
  measurementId: "G-TQ8PWBFX4M",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
