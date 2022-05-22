import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import {
    getAuth
} from 'firebase/auth';
import {
    getFirestore
} from 'firebase/firestore';
import {
    getStorage
} from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firebaseAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp)