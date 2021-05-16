import { ctx, canvasWidth, canvasHeight } from './canvas.js';
import { food, generateFood } from './food.js';

// body of snake compose of segments
export const snakeBody = [
  {
    x: 180,
    y: 180,
  },
];

// width and height of snake segments/parts
const snakeSegmentSize = {
  width: 20,
  height: 20,
};

// snake direction
const snakeDirection = {
  x: 0,
  y: 0,
};

// update all snake data
export function updateSnake() {
  // checks if player is game over
  if (onGameOver()) {
    console.log('gameover');
  }

  // checks if snake ate the food
  onSnakeEat();

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = { ...snakeBody[i - 1] };
  }

  snakeBody[0].x += snakeDirection.x;
  snakeBody[0].y += snakeDirection.y;
}

// draw snake and food on the screen
export function drawSnake() {
  // clear canvas to erase previous paint
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw food on the screen
  // food color yellow
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(food.x, food.y, food.width, food.height);

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
}

// checks if the game is over
// updates isGameOver flag variable
function onGameOver() {
  return isSnakeIntersected() || isBoundaryIntersected();
}

// check if snake head intersected to its body
function isSnakeIntersected() {
  return snakeBody.some((segment, idx) => {
    if (idx !== 0) {
      // snakeBody[0] is snake's head
      if (segment.x === snakeBody[0].x && segment.y === snakeBody[0].y)
        return true;
    }
  });
}

// check if snake head intersected to the boundaries
function isBoundaryIntersected() {
  return false;
}

// update snake direction
export function setSnakeDirection(direction) {
  if (
    direction !== 'right' &&
    direction !== 'left' &&
    direction !== 'up' &&
    direction !== 'down'
  )
    return;

  // update snakeDirection
  switch (direction) {
    case 'right':
      if (snakeDirection.x !== -snakeSegmentSize.width) {
        snakeDirection.x = snakeSegmentSize.width;
        snakeDirection.y = 0;
      }
      break;
    case 'left':
      if (snakeDirection.x !== snakeSegmentSize.width) {
        snakeDirection.x = -snakeSegmentSize.width;
        snakeDirection.y = 0;
      }
      break;
    case 'up':
      if (snakeDirection.y !== snakeSegmentSize.height) {
        snakeDirection.y = -snakeSegmentSize.height;
        snakeDirection.x = 0;
      }
      break;
    case 'down':
      if (snakeDirection.y !== -snakeSegmentSize.height) {
        snakeDirection.y = snakeSegmentSize.height;
        snakeDirection.x = 0;
      }
      break;
    default:
      return undefined;
  }
}

// returns snake last segment or the tail of the snake
function getLastSnakeSegment() {
  return snakeBody[snakeBody.length - 1];
}

function addSnakeSegment() {
  // get last snake segment to know x position and y position
  const lastSnakeSegment = getLastSnakeSegment();
  const newSegment = {};

  if (snakeDirection.x > 0) {
    newSegment.x = lastSnakeSegment.x - snakeSegmentSize.width;
    newSegment.y = snakeSegmentSize.y;
  } else if (snakeDirection.x < 0) {
    newSegment.x = lastSnakeSegment.x;
    newSegment.y = snakeSegmentSize.y;
  } else if (snakeDirection.y > 0) {
    newSegment.x = snakeSegmentSize.x;
    newSegment.y = lastSnakeSegment.y;
  } else if (snakeDirection.y < 0) {
    newSegment.x = lastSnakeSegment.x;
    newSegment.y = lastSnakeSegment.y - snakeSegmentSize.height;
  }

  snakeBody.push(newSegment);
}

// checks if snake ate the food
// if snake head positions is the same as food positions
// the food is eaten
function onSnakeEat() {
  // snakeBody[0] is snake's head
  if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
    // remove food on the canvas
    ctx.clearRect(food.x, food.y, food.width, food.height);
    // add new snake segment to snake body/ tail
    addSnakeSegment();
    // generate new food
    generateFood();
  }
}
