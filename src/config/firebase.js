import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYcSblzEdy-4_nxPUCW87njYD1ILxf-kE",
  authDomain: "terranova-marketing.firebaseapp.com",
  projectId: "terranova-marketing",
  storageBucket: "terranova-marketing.firebasestorage.app",
  messagingSenderId: "1065217966892",
  appId: "1:1065217966892:web:0913341dd2d6dc2a1c2289",
  measurementId: "G-WEG3J896QE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
