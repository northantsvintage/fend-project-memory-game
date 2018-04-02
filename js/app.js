// cardFlip function refactored from Adam Khoury Youtube Tutorial
// http://www.youtube.com/watch?v=c_ohDPWmsM0

// variables
let cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsStorage = [];
let cardsIds = [];
let cardsFlipped = 0;

let countMoves = document.querySelector('.moves'); // moves counter
const stars = document.querySelectorAll('.fa-star'); // star icons
let deck = document.getElementById('deck'); // cards will be populated here
const restartBtn = document.querySelector('.restart'); // restart button
let starRating = document.querySelector('.stars');
// Get the modal
let modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content p');
let span = document.getElementsByClassName('close')[0];
let modalMessage = '';
// time variables
let second = 0;
let minute = 0;
let hour = 0;
let timer = document.querySelector('.timer');
let interval;
let moves = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
// this function will shuffle array of cards
function shuffle(array) {
    let currentIndex = array.length,temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* newBoard creates populates .deck with div.card
* every card have separate id created in a loop
* resets number of moves, flipped cards, star rating to create new board
*/
function newBoard() {
    moves = 0; // reset moves
    countMoves.innerHTML = moves;

    cardsFlipped = 0;
    let displayCards = '';
    shuffle(cardsArray); // shuffle cards
    for (i = 0; i < cardsArray.length; i++) {
        displayCards += '<div class="card" id="card_'+i+'" onclick="cardFlip(this,\''+cardsArray[i]+'\')"></div>';
    }

    deck.innerHTML = displayCards;
    // reset stars rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = '#ffd700';
        stars[i].style.visibility = 'visible';
    }

}

newBoard();

/* function cardFlip
  if nothing inside the div and that the amount of memory cards turned is less than two
  The card can be flipped
  if no cards already flipped or that there is only one card flipped
  set the card as flipped and save them in the memory
  else if one card is flipped
  set the card as flipped and save them in the memory
  if the values of the two cards are the same
  add 2 to the match cards
  if the amount on the cards is the same as the length of the memory
  modal kicks in
  else
  If the two cards don't match cards will be flip back again after 600ms
*/
function cardFlip(card, val) {
  // nothing inside of div and cards in memory less then 2
    if (card.innerHTML == '' && cardsStorage.length < 2) {
        moveCounter(); // increase counter for 1
        // flips card to front and shows it's letter
        card.style.background = '#ffffff';
        card.innerHTML = val;
        // flipped cards go into memory
        if (cardsStorage.length == 0) {
            // gets first card [0] and pushes into array
            cardsStorage.push(val);
            cardsIds.push(card.id);

        } else if (cardsStorage.length == 1) {
            // gets both cards [0][1] and pushes them into array
            cardsStorage.push(val);
            cardsIds.push(card.id);
            //  if two cards are the same
            if (cardsStorage[0] == cardsStorage[1]) {
                // counting cards and adds 2 to storage
                cardsFlipped += 2;
                // Clear both arrays
                cardsStorage = [];
                cardsIds = [];
                // flipped cards equal length of memory game is over, modal kicks in
                if (cardsFlipped === cardsArray.length) {
                    // modal starts here
                    // how much time it took to win the game, and what the star rating was.
                    modal.style.display = 'block';
                    modalMessage = 'Congratulations! You are the winner!'
                    modalMessage += '<br>Time: ' + timer.innerText;
                    modalMessage += '<br>It took you ' + countMoves.innerText + ' moves';
                    modalMessage += '<br>You got <ul class="modal-stars">' + starRating.innerHTML  + '</ul> stars';
                    modalMessage += '<br>Would you like to play again? ';
                    modalContent.innerHTML = modalMessage;

                    span.addEventListener('click', function() {
                      modal.style.display = 'none';
                    });
                    resetBoard();
                    deck.innerHTML = '';
                    newBoard();
                }
            } else {
                // if cards don't match, flip the to back
                function flip2Back() {
                    // Flip the two cards back over
                    let cardOne = document.getElementById(cardsIds[0]);
                    let cardTwo = document.getElementById(cardsIds[1]);

                    cardOne.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardOne.innerHTML = '';
                    // add style.animation here
                    cardTwo.style.background = 'linear-gradient(160deg, #f4ae99 0%, #bb7ebd 100%)';
                    cardTwo.innerHTML = '';
                    // add style.animation here

                    // Clear memory
                    cardsStorage = [];
                    cardsIds = [];
                }
                // If the two cards are not the same, the cards will be flip back again
                setTimeout(flip2Back, 600);
            }
        }
    }
}



/*
* function startTimer to calculate game time
* increase 1sec at a time
*/
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + ' mins ' + second + ' secs ';
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


/*
* function moveCounter calculates number of moves and star rating
* depending on number of moves, star rating is defined
*/
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
                stars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves > 24) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    // starRating.innerHTML = stars.length;
}

/*
* function resetBoard
* reseting timer interval
* reseting count moves
*/
function resetBoard() {
    clearInterval(interval);
    timer.innerHTML = '0 mins 0 secs';
    countMoves.innerHTML = '';
    newBoard();
}

// event listener to restart game
restartBtn.addEventListener('click', function() {
  resetBoard();
});
