import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
document.addEventListener("DOMContentLoaded", () => {
  const profileData = JSON.parse(localStorage.getItem("profile"));
  if (profileData) {
    document.getElementById("username").value = profileData.username || "";
    document.getElementById("email").value = profileData.email || "";
    document.getElementById("password").value = profileData.password || "";
  } else {
    alert("Vui lòng đăng nhập trước!");
    window.location.href = "./login.html";
  }
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    });
  }
  // Gửi email đổi mật khẩu
  const resetBtn = document.getElementById("resetPasswordBtn");
  if (resetBtn && profileData?.email) {
    resetBtn.addEventListener("click", async () => {
      try {
        await sendPasswordResetEmail(auth, profileData.email);
        alert("Đã gửi email đổi mật khẩu tới: " + profileData.email);
      } catch (err) {
        alert("Gửi email thất bại: " + err.message);
      }
    });
  }
});
