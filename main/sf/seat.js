const seatsContainer = document.querySelector('.seats-container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const confirmButton = document.getElementById('confirm');
const ticketPrice = 90000;
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
function saveSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => {
        return {
            row: seat.dataset.row,
            col: seat.dataset.col
        };
    });
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsArray));
    localStorage.setItem('totalPrice', total.innerText);
}
seatsContainer.addEventListener('click', (e) => {
    const seatElement = e.target.closest('.seat');
    if (seatElement && !seatElement.classList.contains('occupied')) {
        seatElement.classList.toggle('selected');
        updateSelectedCount();
    }
});
confirmButton.addEventListener('click', () => {

    saveSelectedSeats();
    const seat = JSON.parse(localStorage.getItem('selectedSeats'))
    if (seat.length) {
        alert(`Bạn đã chọn ${count.innerText} ghế với tổng tiền là ${total.innerText}`);
        location.href = './food.html'
    }

});

const ticket = JSON.parse(localStorage.getItem('ticket'))
const seat = JSON.parse(localStorage.getItem('selectedSeats'))
console.log(ticket, seat);
