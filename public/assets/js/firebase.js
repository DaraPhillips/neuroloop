import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzJreRT1E6-ONXZEsdB1w7-jCo3-6ysiQ",
  authDomain: "neuroloop-13690.firebaseapp.com",
  projectId: "neuroloop-13690",
  storageBucket: "neuroloop-13690.firebasestorage.app",
  messagingSenderId: "350302613612",
  appId: "1:350302613612:web:2f01b07d3261df64ef6849",
  measurementId: "G-66KVM25NZ7"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Export Firebase services and utilities
export { auth, database, storage, ref, onValue };
