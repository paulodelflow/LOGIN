// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIkWfLrHJgI1hCmV2v8HuJX2zXToGMBiM",
    authDomain: "hola2-197a4.firebaseapp.com",
    projectId: "hola2-197a4",
    storageBucket: "hola2-197a4.appspot.com",
    messagingSenderId: "449881263897",
    appId: "1:449881263897:web:5f7d2dddc4e13cf691ff88",
    measurementId: "G-ZQ40F184DP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };