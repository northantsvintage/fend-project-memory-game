// After following this tutorial, manage to finish the game
// cardFlip function
// http://www.youtube.com/watch?v=c_ohDPWmsM0
const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsStorage = [];
let cardsIds = [];
let cardsFlipped = 0;

let countMoves = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star"); // identify variables for star icons
let deck = document.getElementById('deck');
// Get the modal
let modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content p');
let span = document.getElementsByClassName("close")[0];
let modalMessage = '';

// time variables
let second = 0,
    minute = 0,
    hour = 0;
let timer = document.querySelector(".timer");
let interval;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
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
    moves = 0; // reset moves
    countMoves.innerHTML = moves;

    cardsFlipped = 0;
    let displayCards = '';
    shuffle(cardsArray); // shuffle cards
    for (let i = 0; i < cardsArray.length; i++) {
        displayCards += '<div class="card" id="card_' + i + '" onclick="cardFlip(this,\'' + cardsArray[i] + '\')"></div>';
    }

    deck.innerHTML = displayCards;
    // reset stars rating
    for (let i = 0; i < stars.length; i++) {
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
            // gets fitst card [0] and pushes into array
            cardsStorage.push(val);
            cardsIds.push(card.id);

        } else if (cardsStorage.length == 1) {
            // gets both cards [0][1] and pushes them into array
            cardsStorage.push(val);
            cardsIds.push(card.id);

            if (cardsStorage[0] == cardsStorage[1]) {
                // counts 8 pairs
                cardsFlipped += 2;

                // Clear both arrays
                cardsStorage = [];
                cardsIds = [];
                // Check to see if the whole board is cleared
                if (cardsFlipped === cardsArray.length) {
                    // modal starts here
                    modal.style.display = "block";
                    modalMessage = 'Congratulations! You are the winner!'
                    modalMessage += '<br>Time: ' + timer.innerText;
                    modalMessage += '<br>It took you ' + countMoves.innerText + ' moves';
                    modalMessage += '<br>Would you like to play again? ';
                    // how much time it took to win the game, and what the star rating was.
                    modalContent.innerHTML = modalMessage;

                    span.addEventListener('click', function() {
                      modal.style.display = "none";
                    });
                    resetBoard();
                    deck.innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the two cards back over
                    let cardOne = document.getElementById(cardsIds[0]);
                    let cardTwo = document.getElementById(cardsIds[1]);

                    cardOne.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardOne.innerHTML = "";
                    // add style.animation here
                    cardTwo.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardTwo.innerHTML = "";
                    // add style.animation here
                    
                    // Clear both arrays
                    cardsStorage = [];
                    cardsIds = [];
                }
                setTimeout(flip2Back, 600);
            }
        }
    }
}



// Function to Calculate Game Time
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


// Function to Calculate Moves
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

// Function to Reset Board
function resetBoard() {
    clearInterval(interval);
    timer.innerHTML = '0 mins 0 secs';
    countMoves.innerHTML = '';
    newBoard();
}
