
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, AuthError } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBhd1TdPtAF4COzfeHviP5y1RVIlLHyDH4",
  authDomain: "technician-app-8008135.firebaseapp.com",
  projectId: "technician-app-8008135",
  storageBucket: "technician-app-8008135.appspot.com",
  messagingSenderId: "29374414234",
  appId: "1:29374414234:web:59439d784bd35016e88e23",
  measurementId: "G-1XKGNGJD47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { 
  db, 
  auth,
  storage, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  query, 
  where 
};
