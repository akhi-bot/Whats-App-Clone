import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBBaq-5BUyv8PL2yE4KTLKwdNkY3VJgvdU",
    authDomain: "whats-app-clone-c7ac0.firebaseapp.com",
    databaseURL: "https://whats-app-clone-c7ac0-default-rtdb.firebaseio.com",
    projectId: "whats-app-clone-c7ac0",
    storageBucket: "whats-app-clone-c7ac0.appspot.com",
    messagingSenderId: "497099127798",
    appId: "1:497099127798:web:7d053979b1f3ad28eaa5d7",
    measurementId: "G-DG1TZ2PN33"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider}
  
  export default db
  
