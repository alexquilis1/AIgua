// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-Z_TIUTPwHZjNQuw5AezuaAb4teY0VhI",
    authDomain: "aigua-ibm.firebaseapp.com",
    projectId: "aigua-ibm",
    storageBucket: "aigua-ibm.firebasestorage.app",
    messagingSenderId: "401167975536",
    appId: "1:401167975536:web:dc6f9b34c79f711f1960b5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);
