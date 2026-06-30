import { easyMove, hardMove, mediumMove } from './ai.js';
import { playClick, playDraw, playWin } from './sounds.js';
import { loadScore, saveScore } from './storage.js';

import { resetBoard, state } from './gameState.js';

import {
  hideModal,
  highlightWinner,
  removeWinner,
  renderBoard,
  showDraw,
  showWinner,
  updateScore,
  updateTurn,
} from './ui.js';

import { checkDraw, checkWinner, getWinningPattern } from './gameLogic.js';

const cells = document.querySelectorAll('.cell');

const playAgainBtn = document.getElementById('playAgainBtn');

const restartBtn = document.getElementById('restartBtn');

const resetBtn = document.getElementById('resetBtn');

export function startGame(mode = 'friend', level = 'easy') {
  state.gameMode = mode;

  state.difficulty = level;

  resetBoard();
  removeWinner();
  hideModal();

  renderBoard(state.board);
  updateTurn(state.currentPlayer, state.gameMode);

  attachEvents();
}

function attachEvents() {
  cells.forEach((cell) => {
    cell.removeEventListener('click', handleClick);

    cell.addEventListener('click', handleClick);
  });

  restartBtn.onclick = restartGame;

  resetBtn.onclick = handleResetScore;

  playAgainBtn.onclick = () => {
    hideModal();
    restartGame();
  };
}

function handleClick(e) {
  if (state.gameOver) return;

  const index = Number(e.target.dataset.index);

  if (state.board[index] != '') return;

  state.board[index] = state.currentPlayer;
  playClick();

  renderBoard(state.board);

  checkGameStatus();
}

function changeTurn() {
  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

  updateTurn(state.currentPlayer, state.gameMode);
}

function restartGame() {
  resetBoard();

  removeWinner();
  hideModal();

  renderBoard(state.board);
  updateTurn(state.currentPlayer, state.gameMode);
}

function handleResetScore() {
  state.score.x = 0;

  state.score.o = 0;

  state.score.draw = 0;

  updateScore(state.score);
  saveScore(state.score);

  restartGame();
}

function checkGameStatus() {
  const winner = checkWinner(state.board);

  if (winner === 'X' || winner === 'O') {
    state.gameOver = true;

    highlightWinner(getWinningPattern(state.board));

    if (winner === 'X') {
      state.score.x++;
    } else {
      state.score.o++;
    }

    updateScore(state.score);
    saveScore(state.score);
    playWin();

    showWinner(winner);

    return;
  }

  if (winner === 'draw') {
    state.gameOver = true;

    state.score.draw++;

    updateScore(state.score);
    saveScore(state.score);

    playDraw();

    showDraw();

    return;
  }

  if (checkDraw(state.board)) {
    state.gameOver = true;

    state.score.draw++;

    updateScore(state.score);
    saveScore(state.score);

    showDraw();

    return;
  }

  changeTurn();

  if (state.gameMode === 'computer' && state.currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}
function getEmptyIndexes(board) {
  return board
    .map((cell, index) => (cell === '' ? index : null))
    .filter((index) => index !== null);
}
function computerMove() {
  if (state.gameOver) return;

  const emptyIndexes = getEmptyIndexes(state.board);

  if (emptyIndexes.length === 0) return;

  let move;

  if (state.difficulty === 'easy') {
    move = easyMove(state.board);
  } else if (state.difficulty === 'medium') {
    move = mediumMove(state.board);
  } else {
    move = hardMove(state.board);
  }

  if (move === null || move === undefined) return;

  state.board[move] = 'O';

  renderBoard(state.board);

  checkGameStatus();
}

const savedScore = loadScore();

if (savedScore) {
  state.score = savedScore;
  updateScore(state.score);
}
