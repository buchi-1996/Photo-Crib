import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxqioq-uxfkSqtAyKT5Sn-9r8xWUQFrPM",
  authDomain: "photo-crib.firebaseapp.com",
  projectId: "photo-crib",
  storageBucket: "photo-crib.appspot.com",
  messagingSenderId: "376641948846",
  appId: "1:376641948846:web:4403c9ef5d81d7bf66313f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;