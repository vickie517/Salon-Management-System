// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlBdSSdoj67JHm1S2coFmj0SugEXkk4hE",
  authDomain: "salon-management-system-78b23.firebaseapp.com",
  projectId: "salon-management-system-78b23",
  storageBucket: "salon-management-system-78b23.firebasestorage.app",
  messagingSenderId: "896999265758",
  appId: "1:896999265758:web:7f195522925243fce4f94f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Export the app so other files can use it
export { app, db };