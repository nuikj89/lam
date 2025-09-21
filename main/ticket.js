import { auth, db } from "./scripts/firebase.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const ordersContainer = document.getElementById("orders");

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      ordersContainer.innerHTML = "<p>Bạn cần đăng nhập để xem đơn hàng.</p>";
      return;
    }
    try {
      // Lấy document của người đăng nhập
      const currentUserDoc = await getDoc(doc(db, "users", user.uid));
      if (!currentUserDoc.exists()) {
        ordersContainer.innerHTML = "<p>Không tìm thấy dữ liệu người dùng.</p>";
        return;
      }

      const currentUserData = currentUserDoc.data();
      const isStaff = currentUserData.role === "nhanvien"; // 🔑 kiểm tra role

      ordersContainer.innerHTML = "";

      if (isStaff) {
        // 🟢 Nhân viên: lấy tất cả users và orders của họ
        const usersSnap = await getDocs(collection(db, "users"));
        usersSnap.forEach((userSnap) => {
          const data = userSnap.data();
          const username = data.username || "(Không có tên)";
          const orders = data.orders || [];
          if (orders.length === 0) return;

          orders.forEach((order, index) => {
            const card = document.createElement("div");
            card.className = "order-card";
            card.innerHTML = `
              <h2>Đơn hàng (User: ${username})</h2>
              <p><strong>Phim:</strong> ${order.movie || ""}</p>
              <p><strong>Giờ chiếu:</strong> ${order.showtime || ""}</p>
              <p><strong>Ghế:</strong> ${
                Array.isArray(order.seats)
                  ? order.seats.map(s => s.row ? s.row + s.col : s).join(", ")
                  : ""
              }</p>
              <p><strong>Đồ ăn:</strong></p>
              <ul>
                ${
                  Array.isArray(order.foods) && order.foods.length > 0
                    ? order.foods
                        .map(f => `<li>${f.name || ""} - ${(f.price || 0).toLocaleString('vi-VN')} VNĐ</li>`)
                        .join("")
                    : "<li>Không có</li>"
                }
              </ul>
              <p><strong>Tổng tiền:</strong> ${(order.total || 0).toLocaleString('vi-VN')} VNĐ</p>
              <p><small>Ngày đặt: ${
                order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString('vi-VN')
                  : new Date(order.createdAt || Date.now()).toLocaleString('vi-VN')
              }</small></p>
            `;
            ordersContainer.appendChild(card);
          });
        });
      } else {
        // 🟡 Người dùng bình thường: chỉ xem đơn của chính mình
        const username = currentUserData.username || "(Không có tên)";
        const orders = currentUserData.orders || [];
        if (orders.length === 0) {
          ordersContainer.innerHTML = "<p>Bạn chưa có đơn hàng nào.</p>";
          return;
        }
        orders.forEach((order, index) => {
          const card = document.createElement("div");
          card.className = "order-card";
          card.innerHTML = `
            <h2>Đơn hàng #${index + 1}</h2>
            <p><strong>Tài khoản:</strong> ${username}</p>
            <p><strong>Phim:</strong> ${order.movie || ""}</p>
            <p><strong>Giờ chiếu:</strong> ${order.showtime || ""}</p>
            <p><strong>Ghế:</strong> ${
              Array.isArray(order.seats)
                ? order.seats.map(s => s.row ? s.row + s.col : s).join(", ")
                : ""
            }</p>
            <p><strong>Đồ ăn:</strong></p>
            <ul>
              ${
                Array.isArray(order.foods) && order.foods.length > 0
                  ? order.foods
                      .map(f => `<li>${f.name || ""} - ${(f.price || 0).toLocaleString('vi-VN')} VNĐ</li>`)
                      .join("")
                  : "<li>Không có</li>"
              }
            </ul>
            <p><strong>Tổng tiền:</strong> ${(order.total || 0).toLocaleString('vi-VN')} VNĐ</p>
            <p><small>Ngày đặt: ${
              order.createdAt?.seconds
                ? new Date(order.createdAt.seconds * 1000).toLocaleString('vi-VN')
                : new Date(order.createdAt || Date.now()).toLocaleString('vi-VN')
            }</small></p>
          `;
          ordersContainer.appendChild(card);
        });
      }
    } catch (err) {
      console.error("Lỗi lấy đơn hàng:", err);
      ordersContainer.innerHTML = `<p>Lỗi khi tải đơn hàng: ${err.message}</p>`;
    }
  });
});
