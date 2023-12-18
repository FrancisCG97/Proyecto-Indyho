// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    EmailAuthProvider,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAA2XE23eD2jVJz__eXgAxap9PpdphIj8",
  authDomain: "gestor-oc.firebaseapp.com",
  projectId: "gestor-oc",
  storageBucket: "gestor-oc.appspot.com",
  messagingSenderId: "42496116640",
  appId: "1:42496116640:web:2209b9afd73d9e517146c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = EmailAuthProvider;
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error('Error al configurar la persistencia local:', error);
    });