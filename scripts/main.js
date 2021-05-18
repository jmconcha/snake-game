// how many render per second
// this will be the snake speed
const renderPerSec = 10;
// last render timestamp
let lastRenderTime = 0;

// initialize snake
const snake = new Snake();
const food = new Food();

function isGameOver() {
  return snake.isDead();
}

function main(currentTime) {
  // checks if player is game over
  if (!isGameOver()) {
    // continue the game
    window.requestAnimationFrame(main);
  } else {
    // stop the game, stop drawing on the canvas
    console.log('game over');
  }

  // milliseconds since last render
  let lastRenderMS = (currentTime - lastRenderTime) / 1000;
  // controls how many render per sec
  if (lastRenderMS < 1 / renderPerSec) return;

  // update snake first before clearing the canvas and painting snake and food
  snake.updateSnake();

  // stop painting if the game is already over
  if (isGameOver()) return;

  // clear canvas to erase previous paint
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  food.drawFood();
  snake.drawSnake();

  lastRenderTime = currentTime;
}

// watch for UP, DOWN, LEFT, and RIGHT arrow key press
window.addEventListener('keydown', function (e) {
  const direction = e.key.replace('Arrow', '').toLowerCase();
  snake.setSnakeDirection(direction);
});

main();
