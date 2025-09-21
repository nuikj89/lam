import { auth, db } from "./scripts/firebase.js";
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const movieNameElement = document.getElementById('movie-name');
const timemovieElement = document.getElementById('showtime');
const selectedSeatsElement = document.getElementById('selected-seats');
const foodItemsElement = document.getElementById('food-items');
const totalPriceElement = document.getElementById('total-price');
const confirmPaymentButton = document.getElementById('confirm-payment');
const selectedMovie = JSON.parse(localStorage.getItem('ticket')) || {};
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
const foodOrder = JSON.parse(localStorage.getItem('foodOrder')) || [];
const totalPrice = localStorage.getItem('totalPrice');
movieNameElement.textContent = selectedMovie?.nameFilm || 'Không có thông tin';
if (selectedSeats.length > 0) {
    const seatLabels = selectedSeats
        .map(seat => `${seat.row || ''}${seat.col || ''}`)
        .join(', ');
    selectedSeatsElement.innerHTML = seatLabels;
} else {
    selectedSeatsElement.textContent = 'Chưa chọn ghế';
}
let foodTotal = 0;
if (foodOrder.length > 0) {
    foodOrder.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name || ''} - ${(item.price || 0).toLocaleString('vi-VN')} VNĐ`;
        foodItemsElement.appendChild(li);
        foodTotal += item.price || 0;
    });
} else {
    foodItemsElement.innerHTML = '<li>Không có món ăn nào</li>';
}
const ticketTotal = totalPrice ? parseInt(totalPrice) : 0;
const finalTotal = ticketTotal + foodTotal;
totalPriceElement.textContent = finalTotal.toLocaleString('vi-VN') + ' VNĐ';
confirmPaymentButton.addEventListener('click', async () => {
    alert('Thanh toán thành công!');
    const user = auth.currentUser;
    if (user) {
        try {
            const orderData = {
                movie: selectedMovie?.nameFilm || "",
                showtime: selectedMovie?.time || "",
                seats: Array.isArray(selectedSeats) ? selectedSeats : [],
                foods: Array.isArray(foodOrder) ? foodOrder : [],
                total: finalTotal || 0,
                createdAt: new Date()
            };
            await updateDoc(doc(db, "users", user.uid), {
                orders: arrayUnion(orderData)
            });
            alert("Đã lưu order");
        } catch (err) {
            console.error("Lỗi lưu order:", err);
            alert("Không thể lưu đơn hàng: " + err.message);
        }
    }
    ["ticket", "selectedSeats", "foodOrder", "totalPrice"].forEach(k => localStorage.removeItem(k));
    window.location.href = './main.html';
});