import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    if (!email.includes("@")) {
      alert("Email phải có chứa ký tự @");
    } else if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      alert("Mật khẩu phải có ít nhất 1 chữ in hoa, 1 chữ thường và 1 số.");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
        console.log("user object: ", user);
        await updateProfile(user, { displayName: username });
        await setDoc(doc(db, "users", user.uid), {
          username,
          email,
          password,
        });
        await sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email xác minh đã gửi tới:", user.email);
            alert("Đã gửi email xác minh tới: " + user.email + ". Kiểm tra cả hộp Spam nhé!");
          })
          .catch((error) => {
            console.error("Lỗi gửi email xác minh:", error.code, error.message);
            alert("Gửi email xác minh thất bại: " + error.message);
          });
        await signOut(auth);
        form.reset();
      } catch (err) {
        console.error("Đăng ký lỗi:", err.code, err.message);
        alert("Đăng ký lỗi: " + err.message);
      }
    }
  });
});