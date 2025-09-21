import { auth } from "./scripts/firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🆕 Kiểm tra đăng nhập bằng Firebase Auth
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("Bạn cần đăng nhập để xem thông tin tài khoản!");
      window.location.href = "./login.html"; // chuyển về trang login
      return;
    }
  });
  const profileData = JSON.parse(localStorage.getItem("profile")) || {};
  const usernameEl  = document.getElementById("username");
  const emailEl     = document.getElementById("email");
  const passwordEl  = document.getElementById("password");
  const roleEl      = document.getElementById("role");   // hiển thị vai trò
  if (usernameEl) usernameEl.value = profileData.username || "";
  if (emailEl)    emailEl.value    = profileData.email    || "";
  if (passwordEl) passwordEl.value = profileData.password || "";
  if (roleEl)     roleEl.value     = profileData.role     || "user";
  // Toggle ẩn/hiện mật khẩu
  const toggleBtn = document.getElementById("togglePassword");
  if (toggleBtn && passwordEl) {
    toggleBtn.addEventListener("click", () => {
      passwordEl.type = passwordEl.type === "password" ? "text" : "password";
    });
  }
  // Gửi email reset password
  const resetBtn = document.getElementById("resetPasswordBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      const email =
        (profileData && profileData.email)
          ? profileData.email
          : (emailEl ? emailEl.value.trim() : "");
      if (!email) {
        alert("Không có email để gửi yêu cầu đổi mật khẩu.");
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email);
        console.log("Reset email gửi đến:", email);
        alert("Đã gửi email đổi mật khẩu tới: " + email + ". Vui lòng kiểm tra hòm thư.");
      } catch (err) {
        console.error("sendPasswordResetEmail error:", err);
        alert("Gửi email thất bại: " + (err.message || err));
      }
    });
  }
});
