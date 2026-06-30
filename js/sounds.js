

const clickSound = new Audio('assets/click.mp3');

const winSound = new Audio('assets/win.mp3');

const drawSound = new Audio('assets/draw.mp3');



export function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}



export function playWin() {
  winSound.currentTime = 0;
  winSound.play();
}



export function playDraw() {
  drawSound.currentTime = 0;
  drawSound.play();
}
