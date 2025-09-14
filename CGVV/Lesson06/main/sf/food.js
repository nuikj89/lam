const foodItems = document.querySelectorAll('.food-item');
const orderList = document.querySelector('.order-list');
const totalElement = document.querySelector('.total');
const checkoutButton = document.getElementById('checkout');
let order = [];
//tổng tiền
function updateTotal() {
    let total = 0;
    order.forEach(item => {
        total += item.price;
    });
    totalElement.textContent = `Tổng tiền: ${total.toLocaleString('vi-VN')} VNĐ`;
}
//hiển thị 
function renderOrderItem(item) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toLocaleString('vi-VN')} VNĐ</span>
        <button class="remove-from-order" data-id="${item.id}">Hủy</button>
    `;
    orderList.appendChild(li);
}
// thêm 
function addToOrder(event) {
    const foodItem = event.target.parentElement;
    const id = parseInt(foodItem.dataset.id);
    const name = foodItem.dataset.name;
    const price = parseInt(foodItem.dataset.price);
    const existingItem = order.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        order.push({ id, name, price, quantity: 1 });
        renderOrderItem({ id, name, price });
    }
    updateTotal();
    saveOrderToLocalStorage();
}
//  xóa 
function removeFromOrder(event) {
    const itemId = parseInt(event.target.dataset.id);
    order = order.filter(item => item.id !== itemId); // lọc
    renderOrderList(); 
    updateTotal();
    saveOrderToLocalStorage();
}
// hiển thị lại
function renderOrderList() {
    orderList.innerHTML = '';
    order.forEach(item => renderOrderItem(item)); // Hiển thị lại các món ăn
}
// lưu vào Local Storage
function saveOrderToLocalStorage() {
    localStorage.setItem('foodOrder', JSON.stringify(order));
}
// lấy từ Local Storage
function getOrderFromLocalStorage() {
    const storedOrder = localStorage.getItem('foodOrder');
    if (storedOrder) {
        order = JSON.parse(storedOrder);
        renderOrderList();
        updateTotal();
    }
}
// Xử lý sự kiện click vào nút "Thêm"
foodItems.forEach(item => {
    item.querySelector('.add-to-order').addEventListener('click', addToOrder);
});
// Xử lý sự kiện click vào nút "Hủy"
orderList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-order')) {
        removeFromOrder(event);
    }
});
// Tải đơn hàng từ Local Storage khi trang tải
getOrderFromLocalStorage();