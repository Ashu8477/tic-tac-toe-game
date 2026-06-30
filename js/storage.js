

export function saveScore(score) {
  localStorage.setItem('tic-score', JSON.stringify(score));
}



export function loadScore() {
  const data = localStorage.getItem('tic-score');

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}
