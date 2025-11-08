// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdfjUvXdCE3hKaeqrae3YCLQB0sVR925c",
  authDomain: "mmwholesale-46f85.firebaseapp.com",
  databaseURL: "https://mmwholesale-46f85-default-rtdb.firebaseio.com",
  projectId: "mmwholesale-46f85",
  storageBucket: "mmwholesale-46f85.appspot.com", // ✅ FIXED
  messagingSenderId: "1010794740019",
  appId: "1:1010794740019:web:d04f7105cae60d76702646",
  measurementId: "G-ZDM9TNGPZ1",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
