// After following this tutorial, finished the game
// http://www.youtube.com/watch?v=c_ohDPWmsM0
// fix modal results
var cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var cardsStorage = [];
var cardsIds = [];
var cardsFlipped = 0;

var countMoves = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star"); // identify variables for star icons
var deck = document.getElementById('deck');
// Get the modal
var modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content p');
var span = document.getElementsByClassName("close")[0];
var modalMessage = '';

// time variables
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

// var moves = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function newBoard() {
    // reset moves
    moves = 0;
    countMoves.innerHTML = moves;

    cardsFlipped = 0;
    var displayCards = '';

    shuffle(cardsArray);
    for (var i = 0; i < cardsArray.length; i++) {
        displayCards += '<div id="card_' + i + '" onclick="cardFlip(this,\'' + cardsArray[i] + '\')"></div>';
    }

    deck.innerHTML = displayCards;
    // reset stars rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

}

newBoard();

function cardFlip(card, val) {
    if (card.innerHTML == "" && cardsStorage.length < 2) {
        moveCounter();
        card.style.background = '#FFF';
        card.innerHTML = val;
        if (cardsStorage.length == 0) {
            cardsStorage.push(val);
            cardsIds.push(card.id);
        } else if (cardsStorage.length == 1) {
            cardsStorage.push(val);
            cardsIds.push(card.id);


            if (cardsStorage[0] == cardsStorage[1]) {
                cardsFlipped += 2;
                // Clear both arrays
                cardsStorage = [];
                cardsIds = [];
                // Check to see if the whole board is cleared
                if (cardsFlipped === cardsArray.length) {
                    ///////////////////////
                    modal.style.display = "block";
                    modalMessage = 'You are Winner ';
                    modalContent.innerText = modalMessage;

                    span.onclick = function() {
                        modal.style.display = "none";
                    }

                    resetBoard();

                    deck.innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the 2 cards back over
                    var cardOne = document.getElementById(cardsIds[0]);
                    var cardTwo = document.getElementById(cardsIds[1]);
                    cardOne.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardOne.innerHTML = "";
                    cardTwo.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardTwo.innerHTML = "";
                    // Clear both arrays
                    cardsStorage = [];
                    cardsIds = [];

                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}



// Function to calculate Game Time
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " mins " + second + " secs ";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


// Function to calculate moves
function moveCounter() {
    moves++;
    countMoves.textContent = moves;
    //start timer on first click
    if (moves == 1) {
        second = 1;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 16 && moves < 28) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 24) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function resetBoard() {
    clearInterval(interval);
    timer.innerHTML = '0 mins 0 secs';
    countMoves.innerHTML = '';
    newBoard();
}
