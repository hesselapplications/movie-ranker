import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0cBPTnowjofVZ2bMyM-vAP0D_Sn2LVA0",
    authDomain: "movie-rank-9f18e.firebaseapp.com",
    projectId: "movie-rank-9f18e",
    storageBucket: "movie-rank-9f18e.appspot.com",
    messagingSenderId: "905799794969",
    appId: "1:905799794969:web:e74b1de56a726d0576c588"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

export default {
    firestore: firestore,
    auth: auth,
    googleAuthProvider: new firebase.auth.GoogleAuthProvider()
}