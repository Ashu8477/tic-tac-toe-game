import { checkWinner } from './gameLogic.js';


function getEmptyCells(board) {
  return board.reduce((empty, cell, index) => {
    if (cell === '') {
      empty.push(index);
    }

    return empty;
  }, []);
}
function minimax(board, isMaximizing) {
  const result = checkWinner(board);

  if (result === 'O') return 10;
  if (result === 'X') return -10;
  if (result === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';

        const score = minimax(board, false);

        board[i] = '';

        bestScore = Math.max(bestScore, score);
      }
    }

    return bestScore;
  }

  let bestScore = Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'X';

      const score = minimax(board, true);

      board[i] = '';

      bestScore = Math.min(bestScore, score);
    }
  }

  return bestScore;
}



function getBestMove(board) {
  let bestScore = -Infinity;

  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';

      const score = minimax(board, false);

      board[i] = '';

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}



export function easyMove(board) {
  const empty = getEmptyCells(board);

  return empty[Math.floor(Math.random() * empty.length)];
}



export function mediumMove(board) {
  return Math.random() > 0.5 ? easyMove(board) : hardMove(board);
}



export function hardMove(board) {
  return getBestMove(board);
}
