export const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== '')) {
    return 'draw';
  }

  return null;
}


export function getWinningPattern(board) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return pattern;
    }
  }

  return [];
}


export function checkDraw(board) {
  return board.every((cell) => cell !== '');
}

