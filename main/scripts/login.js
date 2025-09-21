import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
// set role
        await setDoc(
          doc(db, "users", user.uid),
          { role: "khachhang" },
          { merge: true }
        );
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("profile", JSON.stringify(userData));
        }
        alert("Đăng nhập thành công !");
        window.location.href = "./main.html";
      } catch (err) {
        alert("Lỗi đăng nhập: " + err.message);
      }
    });
  }
// Google login
  const googleBtn = document.getElementById("google-login");
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      try {
        await signOut(auth);
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (!snapshot.exists()) {
          await setDoc(userRef, {
            username: user.displayName || "Google User",
            email: user.email,
            password: "(Google login)",
            role: "khachang"           // 🔹 gán role cho Google login
          });
        } else {
          await setDoc(userRef, { role: "khachhang" }, { merge: true });
        }
        localStorage.setItem("profile", JSON.stringify({
          username: user.displayName || "Google User",
          email: user.email,
          password: "(Google login)",
          role: "khachhang"
        }));
        alert("Đăng nhập Google thành công!");
        window.location.href = "./main.html";
      } catch (err) {
        alert("Lỗi đăng nhập Google: " + err.message);
      }
    });
  }
  const switchLogin = document.getElementById("switch-login");
  if (switchLogin) {
    switchLogin.addEventListener("click", () => {
      window.location.href = "./login_staff.html";
    });
  }
});