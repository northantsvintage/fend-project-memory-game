/*
 * 1. Create a list that holds all of your cards
    2. Create all the variables
 */


/*
 * 3. Display the cards on the page
 *   - 4. shuffle the list of cards using the provided "shuffle" method below
 *   - 5. loop through each card and create its HTML
 *   - 6. add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * 7. set up the event listener for a card. If a card is clicked:
 *  - 8. display the card's symbol (put this functionality in another function that you call from this one)
 *  - 9. add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - 10. if the list already has another card, check to see if the two cards match
 *    11. + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    12. + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    13. + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    14. + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// list that holds all the cards
const imageList = ['fas fa-lemon', 'fas fa-bus', 'fas fa-smile', 'fas fa-lemon', 'fas fa-bicycle', 'fas fa-dove', 'fas fa-hand-peace', 'fas fa-piggy-bank'];
const len = imageList.length;



// display the cards on the page
function generateCards() {
  const ul = document.querySelector('.deck');

      for (let i = 0; i < 16; i++) {
          let li = document.createElement('li');
          li.className = 'card';
          let icon = document.createElement('i');

          //assign classes
          icon.className = imageList[i];

          ul.appendChild(li);
          li.appendChild(icon);
      }
}


shuffle(imageList); //works
generateCards(); //works
