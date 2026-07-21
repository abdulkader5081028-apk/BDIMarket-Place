// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCMf4KF-TyCu5rDXZDsgj5OE95gjN0UMYY",
  authDomain: "bdimarket-place-f95e6.firebaseapp.com",
  projectId: "bdimarket-place-f95e6",
  storageBucket: "bdimarket-place-f95e6.firebasestorage.app",
  messagingSenderId: "1021566476793",
  appId: "1:1021566476793:web:8fd31e3551093f58ec1d28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export
export { app, auth, db, storage };
