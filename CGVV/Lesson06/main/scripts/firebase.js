// Import the functions you need from the SDKs you need
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries   
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX6Y6Fpk-Bps1f0ATh5hxAoMVspgB4f8A",
  authDomain: "spck-f82a1.firebaseapp.com",
  projectId: "spck-f82a1",
  storageBucket: "spck-f82a1.firebasestorage.app",
  messagingSenderId: "377050736871",
  appId: "1:377050736871:web:a008f4f6903de9ddaada42",
  measurementId: "G-SVZSQ72D52"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig); // khởi tạo firebase
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);