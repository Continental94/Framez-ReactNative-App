// src/firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
// We need getAuth because it's sometimes necessary for a clean initialization flow
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// FINAL VERIFIED CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAtK_WrE-tvOP1YGtXJSkkzbxy1gSO0uog", 
  authDomain: "framez-app-1a287.firebaseapp.com",
  projectId: "framez-app-1a287",
  storageBucket: "framez-app-1a287.appspot.com", 
  messagingSenderId: "605956956917",
  appId: "1:605956956917:web:7f4dd8bfefa666977aa9bbc",
};

const app = initializeApp(firebaseConfig);

// The safe way to initialize auth with persistence in Expo
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);