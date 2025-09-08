// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "mindful-moment-mb8na",
  appId: "1:938749099905:web:8629b03379e549fc73f280",
  storageBucket: "mindful-moment-mb8na.firebasestorage.app",
  apiKey: "AIzaSyBRoGJ5-6DTXClGVvPjNX_GFyqLE0-1Dlg",
  authDomain: "mindful-moment-mb8na.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "938749099905"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
