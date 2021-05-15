import { updateSnake, drawSnake } from './snake.js';

// how many render per second
// this will be the snake speed
const renderPerSec = 2;
// last render timestamp
let lastRenderTime = 0;

function update() {
  updateSnake();
}

function draw() {
  drawSnake();
}

function main(currentTime) {
  window.requestAnimationFrame(main);

  // milliseconds since last render
  let lastRenderMS = (currentTime - lastRenderTime) / 1000;
  // controls how many render per sec
  if (lastRenderMS < 1 / renderPerSec) return;

  update();
  draw();

  lastRenderTime = currentTime;
}

main();
