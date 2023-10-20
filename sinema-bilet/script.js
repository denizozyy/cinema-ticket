const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const screen = document.querySelector('.screen');

getFromLocalStorage();
calculateTotal();

function changeScreenSize(container, width, height) {
    container.style.width = width;
    container.style.height = height;

}; 

function increaseSeats() {
    const seat = document.querySelector('#clone .row');
    const newRow = seat.cloneNode(true);
    container.appendChild(newRow);

};

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()
    }
});

select.addEventListener('change', function(e) {
    if (this.options[this.selectedIndex].text == 'Movie 2') {
        changeScreenSize(screen, '350px', '120px');
        increaseSeats();
    } else {
        changeScreenSize(screen, '100%', '65px');
        container.lastChild.remove();
    }

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
