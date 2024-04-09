import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firbaseConfig = {
    apiKey: "AIzaSyBDlQ_1l0h8EPI10WD4NfDyjd6ujz55b1U",
    authDomain: "listafazer-401b8.firebaseapp.com",
    projectId: "listafazer-401b8",
    storageBucket: "listafazer-401b8.appspot.com",
    messagingSenderId: "759057618156",
    appId: "1:759057618156:web:c11325e213f89cdfcf81c9",
    measurementId: "G-0FBYXK2M1Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firbaseConfig)
}

export { firebase };