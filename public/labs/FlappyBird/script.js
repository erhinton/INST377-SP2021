document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');
  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  isGameOver = false;
  const gap = 430;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = `${birdBottom}px`;
    bird.style.left = `${birdLeft}px`;
  }

  const gameTimerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 480) { birdBottom += 50; }
    bird.style.bottom = `${birdBottom}px`;
    console.log(birdBottom);
  }

  function control(event) {
    if (event.keyCode === 32) {
      jump();
    }
  }
  document.addEventListener('keyup', control);
  function generateObstacle() {
    let obstacleLeft = 500;
    const randomHeight = Math.random() * 60;
    const obstacleBottom = randomHeight;

    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')
  }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
        (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)
          || birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId)
      }
    }
    const timerId = setInterval(moveObstacle, 20);
    if (!isGameOver)setTimeout(generateObstacle, 3000);
  }

  function gameOver () {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
  generateObstacle();
});