const player = document.getElementById('player');
const doll = document.getElementById('doll');
const message = document.getElementById('message');
const moveBtn = document.getElementById('moveBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');

let isGreenLight = true;
let playerPosition = 20;
let moveInterval = null;

function toggleDoll() {
  isGreenLight = !isGreenLight;

  if (isGreenLight) {
    doll.classList.remove('stop');
    doll.classList.add('start');
  } else {
    doll.classList.remove('start');
    doll.classList.add('stop');
  }
}

setInterval(toggleDoll, Math.random() * 3000 + 4000);

function movePlayer() {
  if (!isGreenLight) {
    message.textContent = 'You moved during a red light! Game Over.';
    message.classList.remove('win');
    message.style.display = 'block';
    clearInterval(moveInterval);
    endGame();
    return;
  }

  playerPosition += 5;
  player.style.left = playerPosition + 'px';

  if (playerPosition >= 740) {
    message.textContent = 'You win!';
    message.classList.add('win');
    message.style.display = 'block';
    clearInterval(moveInterval);
    endGame();
  }
}

moveBtn.addEventListener('click', () => {
  if (!moveInterval) {
    moveInterval = setInterval(movePlayer, 100);
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(moveInterval);
  moveInterval = null;
});


function endGame() {
  restartBtn.style.display = 'flex'; // Show the restart button
}
restartBtn.addEventListener('click', () => {
  window.location.reload(); // Simple way to reset everything
});