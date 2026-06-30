

const currentTurn = document.getElementById('currentTurn');
const playerOneScore = document.getElementById('playerOneScore');
const playerTwoScore = document.getElementById('playerTwoScore');
const drawScore = document.getElementById('drawScore');

const modal = document.getElementById('resultModal');
const winnerTitle = document.getElementById('winnerTitle');
const winnerMessage = document.getElementById('winnerMessage');

const playAgainBtn = document.getElementById('playAgainBtn');
const boardElement = document.getElementById('board');

function cells() {
  return [...boardElement.children];
}



export function updateTurn(player, mode) {
  currentTurn.textContent =
    mode === 'friend'
      ? `Player ${player} Turn`
      : player === 'X'
        ? 'Your Turn'
        : 'Computer Thinking...';
}

export function showThinking() {
  currentTurn.textContent = 'Computer Thinking...';
}



export function updateScore(score) {
  playerOneScore.textContent = score.x;
  playerTwoScore.textContent = score.o;
  drawScore.textContent = score.draw;
}



export function showModal(title, message) {
  winnerTitle.textContent = title;
  winnerMessage.textContent = message;
  modal.classList.add('active');
}

export function hideModal() {
  modal.classList.remove('active');
}

export function showWinner(player) {
  showModal(`Player ${player} Wins`, 'Congratulations 🎉');
}

export function showDraw() {
  showModal('Draw', 'Nobody Wins');
}



export function clearBoard() {
  cells().forEach((cell) => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

export function renderBoard(board) {
  const boardCells = cells();

  board.forEach((value, index) => {
    const cell = boardCells[index];

    cell.textContent = value;

    cell.classList.remove('x', 'o');

    if (value) {
      cell.classList.add(value.toLowerCase());
    }
  });
}

export function renderCell(index, value) {
  const cell = cells()[index];

  if (!cell) return;

  cell.textContent = value;

  cell.classList.remove('x', 'o');

  if (value) {
    cell.classList.add(value.toLowerCase());
  }
}



export function highlightWinner(pattern) {
  const boardCells = cells();

  pattern.forEach((index) => {
    boardCells[index].classList.add('win');
  });
}

export function removeWinner() {
  cells().forEach((cell) => {
    cell.classList.remove('win');
  });
}



export function enableBoard() {
  boardElement.style.pointerEvents = 'auto';
}

export function disableBoard() {
  boardElement.style.pointerEvents = 'none';
}



export function bindPlayAgain(callback) {
  playAgainBtn.onclick = callback;
}



export function animateButton(button) {
  button.classList.add('pulse');

  setTimeout(() => {
    button.classList.remove('pulse');
  }, 300);
}

export function boardEntry() {
  boardElement.classList.remove('fade-in');

  void boardElement.offsetWidth;

  boardElement.classList.add('fade-in');
}



export function resetUI() {
  clearBoard();
  hideModal();
  removeWinner();
  enableBoard();
}

export function gameOverUI() {
  disableBoard();
}



export function setTitle(title) {
  document.title = title;
}
