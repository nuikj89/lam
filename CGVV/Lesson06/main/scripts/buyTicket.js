const nameFilm = document.getElementById('nameFilm').textContent
let timeStart = document.getElementById('timeStart').textContent
const sumbit =document.getElementById('btn-buy')
sumbit.addEventListener('click', () =>{
    let converTimeStart = timeStart.slice(12)
    console.log(converTimeStart);
    const ticket = {
        nameFilm,
        converTimeStart
    }
    console.log(ticket);
    localStorage.setItem('ticket', JSON.stringify(ticket))
    location.href = '../sf/seat.html'
})