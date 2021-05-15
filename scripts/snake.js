import { ctx, canvasWidth, canvasHeight } from './canvas.js';

// body of snake compose of segments
const snakeBody = [
  {
    x: 200,
    y: 200,
  },
];

// width and height of snake segments/parts
export const snakeSegmentSize = {
  width: 20,
  height: 20,
};

// update all snake data
export function updateSnake() {
  snakeBody[0].x += 20;
}

// draw snake in HTML Canvas
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
