// Code Developed By Renato
// email:20099697@mail.wit.ie
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import dotenv from "dotenv";

// starting .env
dotenv.config();

// setting keys for firebase auth 
const firebaseConfig = {
    apiKey: process.env.api_key,
    authDomain: process.env.auth_domain,
    projectId: process.env.project_id,
    storageBucket: process.env.storage_bucket,
    messagingSenderId: process.env.messaging_sender_id,
    appId: process.env.app_id,
    measurementId: process.env.measurement_id
  };
 
// initialisating database with config
firebase.initializeApp(firebaseConfig);

// setting firestore to export
const fireStore = firebase.firestore();

export { fireStore };