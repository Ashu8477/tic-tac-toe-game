
export const state = {
  board: Array(9).fill(''),

  currentPlayer: 'X',

  gameMode: 'friend',

  difficulty: 'easy',

  gameOver: false,

  score: {
    x: 0,
    o: 0,
    draw: 0,
  },
};


export function resetBoard() {
  state.board = Array(9).fill('');
  state.currentPlayer = 'X';
  state.gameOver = false;
}



export function resetScore() {
  state.score = {
    x: 0,
    o: 0,
    draw: 0,
  };
}
