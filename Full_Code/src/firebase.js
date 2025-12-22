import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Database
import { getStorage } from "firebase/storage";
//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXeUAt89fHWq_5lfKq5lg7k1eoZvKHxew",
  authDomain: "street-paws-4ef6b.firebaseapp.com",
  projectId: "street-paws-4ef6b",
  storageBucket: "street-paws-4ef6b.firebasestorage.app",
  messagingSenderId: "568031624570",
  appId: "1:568031624570:web:4e33fb258cc56776cfeac3",
  measurementId: "G-3Z1D1PVJSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export Auth
export const db = getFirestore(app); // Export Firestore
export const storage = getStorage(app); 