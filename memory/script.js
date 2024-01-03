const grid = document.querySelector('#grid');
const errorCounter = document.querySelector('#error');
const timerDisplay = document.getElementById('timer');
let timer;
let seconds = 0;

let cards;
let deck;
let pick = [];
let errors = 0;
let gameFinished = false;



function initializeGame() {
  cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
  deck = [...cards, ...cards];

  deck.sort(function () {
    return 0.5 - Math.random();
  });

  for (let i = 0; i < deck.length; i++) {
    const card = document.createElement('div');
    const cardName = deck[i];
    card.classList.add('card');
    card.setAttribute('data-name', cardName);
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  }

  errorCounter.innerText = errors;
}

initializeGame(); // Initialize the game when the script is loaded

function flipCard(event) {
  if (!timer) {
    startTimer();
  }

  const card = event.target;

  if (card.classList.contains('flipped') || gameFinished) return;

  card.classList.add(card.getAttribute('data-name'), 'flipped');

  pick.push(card);

  if (pick.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const card1 = pick[0];
  const card2 = pick[1];
  const card1Name = card1.getAttribute('data-name');
  const card2Name = card2.getAttribute('data-name');

  if (card1Name === card2Name) {
    checkForWin();
  } else {
    setTimeout(function () {
      card1.classList.remove(card1Name, 'flipped');
      card2.classList.remove(card2Name, 'flipped');
      errors++;
      errorCounter.innerText = errors;
    }, 500);
  }

  pick = [];
}

function checkForWin() {
  const flippedCards = document.querySelectorAll('.flipped');
  if (flippedCards.length === deck.length) {
    gameFinished = true;
    clearInterval(timer); // Stop the timer when the player wins
    showAlert('You Won!');
    
  }
}

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    timerDisplay.innerText = `Time: ${seconds}s`;
  }, 1000);
}

function restartGame() {
    // Reload the page to restart the game
    location.reload();
}
restartBtn.addEventListener('click', restartGame);
