const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartBtn = document.getElementById('restartBtn');
const timerDisplay = document.getElementById('timer');

let turn = 0;
let timer;
let seconds = 0;

const cellSigns = [];

restartBtn.addEventListener('click', restartGame);

for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];

  cell.addEventListener('click', function () {
    if (cellSigns[i]) {
      return;
    }
    turn++;

    let sign;
    if (turn % 2 === 0) {
      sign = 'O';
    } else {
      sign = 'X';
    }

    cell.innerText = sign;
    cellSigns[i] = sign;

    let hasWon = checkVictory();

    if (hasWon) {
      showAlert(`${sign} has Won `);
    } else if (turn === 9) {
      showAlert('Draw');
    }
  });
}

function checkVictory() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];

    const a = combination[0];
    const b = combination[1];
    const c = combination[2];

    if (cellSigns[a] && cellSigns[a] === cellSigns[b] && cellSigns[b] === cellSigns[c]) {
      return true;
    }
  }

  return false;
}

function restartGame() {
  clearInterval(timer);
  seconds = 0;
  timerDisplay.innerText = 'Time: 0s';
  turn = 0;
  cellSigns.length = 0;

  cells.forEach((cell) => {
    cell.innerText = '';
  });

  gameStatus.innerText = 'Align symbols vertically, horizontally, or diagonally';

  startTimer();
}

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    timerDisplay.innerText = `Time: ${seconds}s`;
  }, 1000);
}

function showAlert(message) {
  gameStatus.innerText = message;
  clearInterval(timer);
  restartBtn.style.display = 'block';
}
