import { startGame } from './js/game.js';



const homeScreen = document.getElementById('homeScreen');
const gameScreen = document.getElementById('gameScreen');

const friendBtn = document.getElementById('friendBtn');
const computerBtn = document.getElementById('computerBtn');

const difficultyBox = document.getElementById('difficultyBox');
const difficultyButtons = document.querySelectorAll(
  '.difficulty-buttons button'
);

const homeBtn = document.getElementById('homeBtn');



function openGame(mode, difficulty = 'easy') {
  homeScreen.classList.remove('active');
  gameScreen.classList.add('active');

  startGame(mode, difficulty);
}



friendBtn.addEventListener('click', () => {
  difficultyBox.style.display = 'none';
  openGame('friend');
});



computerBtn.addEventListener('click', () => {
  difficultyBox.style.display = 'flex';
});



difficultyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openGame('computer', button.dataset.level);
  });
});



homeBtn.addEventListener('click', () => {
  gameScreen.classList.remove('active');
  homeScreen.classList.add('active');

  difficultyBox.style.display = 'none';
});
