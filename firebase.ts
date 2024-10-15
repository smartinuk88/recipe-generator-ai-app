import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3GB3NZxkmaB8GzA_aCCl89h-FPVdss0w",
  authDomain: "instadish-2a9fc.firebaseapp.com",
  projectId: "instadish-2a9fc",
  storageBucket: "instadish-2a9fc.appspot.com",
  messagingSenderId: "7152282865",
  appId: "1:7152282865:web:acc0d53123415646ea4d50",
  measurementId: "G-RL1V9CQCZ9",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
