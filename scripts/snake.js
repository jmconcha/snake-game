import { ctx, canvasWidth, canvasHeight } from './canvas.js';

// body of snake compose of segments
const snakeBody = [
  {
    x: 200,
    y: 200,
  },
];

// width and height of snake segments/parts
const snakeSegmentSize = {
  width: 20,
  height: 20,
};

// snake direction
// snake previous direction
let snakePrevDirection = null;
// snake current direction
let snakeCurrDirection = null;

// update all snake data
export function updateSnake() {
  switch (snakeCurrDirection) {
    case 'right':
      snakeBody[0].x += snakeSegmentSize.width;
      break;
    case 'left':
      snakeBody[0].x -= snakeSegmentSize.width;
      break;
    case 'up':
      snakeBody[0].y -= snakeSegmentSize.height;
      break;
    case 'down':
      snakeBody[0].y += snakeSegmentSize.height;
      break;
  }
}

export function drawSnake() {
  // clear canvas to erase previous paint
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillRect(
    snakeBody[0].x,
    snakeBody[0].y,
    snakeSegmentSize.width,
    snakeSegmentSize.height
  );
}

export function setSnakeDirection(direction) {
  if (
    (snakeCurrDirection === 'right' && direction === 'left') ||
    (snakeCurrDirection === 'left' && direction === 'right') ||
    (snakeCurrDirection === 'up' && direction === 'down') ||
    (snakeCurrDirection === 'down' && direction === 'up')
  )
    return;

  snakePrevDirection = snakeCurrDirection;
  snakeCurrDirection = direction;
}
