// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
// Your web app's Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAS8hUZUPGwyZcvTQLPoztkujoWRDqV7K0",
  authDomain: "e-connect-97b70.firebaseapp.com",
  projectId: "e-connect-97b70",
  storageBucket: "e-connect-97b70.appspot.com",
  messagingSenderId: "885648612706",
  appId: "1:885648612706:web:292d6e3cf040238c17203b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);
export const storage = getStorage(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');