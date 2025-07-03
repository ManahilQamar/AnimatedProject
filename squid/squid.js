const player = document.getElementById('player');
const doll = document.getElementById('doll');
const message = document.getElementById('message');
const messageContainer = document.getElementById('messageContainer');
const moveBtn = document.getElementById('moveBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');

let isGreenLight = true;
let playerPosition = 20;
let moveInterval = null;
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Initialize player position based on device type
if (isMobile) {
  player.style.left = '50%';
  player.style.bottom = playerPosition + 'px';
  player.style.transform = 'translateX(-50%)';
} else {
  player.style.left = playerPosition + 'px';
  player.style.bottom = '90px';
}

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

function showMessage(text, isWin) {
  message.textContent = text;
  message.className = isWin ? 'message win' : 'message';
  message.style.display = 'block';
  messageContainer.style.display = 'flex';
  restartBtn.style.display = 'block';
}

function movePlayer() {
  if (!isGreenLight) {
    showMessage('You moved during a red light! Game Over.', false);
    clearInterval(moveInterval);
    endGame();
    return;
  }

  if (isMobile) {
    // Vertical movement for mobile - bottom to top
    playerPosition += 5;
    player.style.bottom = playerPosition + 'px';
    
    // Check if player reached top (finish line)
    // We need to check when player's bottom position reaches near the top
    // The finish line is 10px tall at the top (from your CSS)
    if (playerPosition >= (document.querySelector('.game-container').offsetHeight - 50)) {
      showMessage('You win!', true);
      clearInterval(moveInterval);
      endGame();
    }
  } else {
    // Horizontal movement for desktop
    playerPosition += 5;
    player.style.left = playerPosition + 'px';
    
    if (playerPosition >= 740) {
      showMessage('You win!', true);
      clearInterval(moveInterval);
      endGame();
    }
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
  restartBtn.style.display = 'block';
}

restartBtn.addEventListener('click', () => {
  window.location.reload();
});