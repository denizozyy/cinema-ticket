const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const movie2 = document.getElementById('movie2');
getFromLocalStorage();
calculateTotal();


function changeScreenSize(element, width, height) {
    element.style.setProperty('width', width);
    element.style.setProperty('height', height);
}

function increaseSeats() {
    const screen = document.querySelector('.screen');
    const row = document.querySelector('.row');
    const newRow = seat.cloneNode(true);
    screen.appendChild(newRow);
};

movie2.addEventListener('click', function() {
    changeScreenSize(screen, '100px', '120px');
    increaseSeats();
});

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()
    }
});

select.addEventListener('change', function(e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats =  container.querySelectorAll('.seat.selected');
    
    const selectedSeatsArr = [];
    const seatsArr = [];
    
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);   
    });

    console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount *select.value;

    saveToLocalStorage(selectedSeatIndexs);
};

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null){
        select.selectedIndex =selectedMovieIndex;
    }
};

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
};