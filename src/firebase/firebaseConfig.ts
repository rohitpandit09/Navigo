import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3eUAgSdHpjv_1l-Rc5sAJPfkm5LWOzwQ",
  authDomain: "database-for-navigo.firebaseapp.com",
  projectId: "database-for-navigo",
  storageBucket: "database-for-navigo.firebasestorage.app",
  messagingSenderId: "352341584093",
  appId: "1:352341584093:web:3c594b1e101385433b1334",
  measurementId: "G-HXE1DDY9Q6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
