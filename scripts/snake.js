import { ctx, canvasWidth, canvasHeight } from './canvas.js';
import { food, generateFood } from './food.js';

// body of snake compose of segments
export const snakeBody = [
  {
    x: 100,
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
  onSnakeEat();

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = { ...snakeBody[i - 1] };
  }

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

  // draw snake
  ctx.fillStyle = '#000000';
  snakeBody.forEach((segment) => {
    ctx.fillRect(
      segment.x,
      segment.y,
      snakeSegmentSize.width,
      snakeSegmentSize.height
    );
  });

  // draw food on the screen
  // food color yellow
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(food.x, food.y, food.width, food.height);
}

export function setSnakeDirection(direction) {
  if (
    (direction !== 'right' &&
      direction !== 'left' &&
      direction !== 'up' &&
      direction !== 'down') ||
    (snakeCurrDirection === 'right' && direction === 'left') ||
    (snakeCurrDirection === 'left' && direction === 'right') ||
    (snakeCurrDirection === 'up' && direction === 'down') ||
    (snakeCurrDirection === 'down' && direction === 'up')
  )
    return;

  snakePrevDirection = snakeCurrDirection;
  snakeCurrDirection = direction;
}

// returns snake last segment or the tail of the snake
function getLastSnakeSegment() {
  return snakeBody[snakeBody.length - 1];
}

function addSnakeSegment() {
  // get last snake segment to know x position and y position
  const lastSnakeSegment = getLastSnakeSegment();
  const newSegment = {};

  switch (snakeCurrDirection) {
    case 'right':
      newSegment.x = lastSnakeSegment.x - snakeSegmentSize.width;
      newSegment.y = snakeSegmentSize.y;
      break;
    case 'left':
      newSegment.x = lastSnakeSegment.x;
      newSegment.y = snakeSegmentSize.y;
      break;
    case 'up':
      newSegment.x = snakeSegmentSize.x;
      newSegment.y = lastSnakeSegment.y;
      break;
    case 'down':
      newSegment.x = lastSnakeSegment.x;
      newSegment.y = lastSnakeSegment.y - snakeSegmentSize.height;
      break;
  }

  snakeBody.push(newSegment);
}

// return snake head
function getSnakeHead() {
  return snakeBody[0];
}

// checks if snake ate the food
// if snake head positions is the same as food positions
// the food is eaten
function onSnakeEat() {
  const snakeHead = getSnakeHead();

  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    // remove food on the canvas
    ctx.clearRect(food.x, food.y, food.width, food.height);
    // add new snake segment to snake body/ tail
    addSnakeSegment();
    // generate new food
    generateFood();
  }
}
