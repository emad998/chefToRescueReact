import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCnrpFP6KyOvO6lnUUM3MU1qKP3MaHa9e0",
    authDomain: "auth-development-1543d.firebaseapp.com",
    projectId: "auth-development-1543d",
    storageBucket: "auth-development-1543d.appspot.com",
    messagingSenderId: "557115894538",
    appId: "1:557115894538:web:8738ca248e6180e1d2a8f3"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
