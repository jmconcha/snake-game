// how many render per second
// this will be the snake speed
const renderPerSec = 2;
// last render timestamp
let lastRenderTime = 0;

// initialize snake
const snake = new Snake();
const food = new Food();

function main(currentTime) {
  window.requestAnimationFrame(main);

  // milliseconds since last render
  let lastRenderMS = (currentTime - lastRenderTime) / 1000;
  // controls how many render per sec
  if (lastRenderMS < 1 / renderPerSec) return;

  // clear canvas to erase previous paint
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  food.drawFood();
  snake.updateSnake();
  snake.drawSnake();

  lastRenderTime = currentTime;
}

// watch for UP, DOWN, LEFT, and RIGHT arrow key press
window.addEventListener('keydown', function (e) {
  const direction = e.key.replace('Arrow', '').toLowerCase();
  snake.setSnakeDirection(direction);
});

main();
