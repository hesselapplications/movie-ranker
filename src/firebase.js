import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0cBPTnowjofVZ2bMyM-vAP0D_Sn2LVA0",
    authDomain: "movierank.netlify.app",
    projectId: "movie-rank-9f18e",
    storageBucket: "movie-rank-9f18e.appspot.com",
    messagingSenderId: "905799794969",
    appId: "1:905799794969:web:e74b1de56a726d0576c588"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export {
    db,
    auth,
    googleAuthProvider
}