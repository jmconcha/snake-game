import { snakeBody } from './snake.js';
import { boxSize, canvasWidth, canvasHeight } from './canvas.js';

// food x, y position, width, and height
export const food = {
  x: 100,
  y: 100,
  width: 20,
  height: 20,
};

export function generateFood() {
  let randX, randY, randomXPos, randomYPos;

  while (true) {
    randX = Math.floor(Math.random() * (canvasWidth / boxSize));
    randY = Math.floor(Math.random() * (canvasHeight / boxSize));

    randomXPos = randX % 2 !== 0 ? (randX - 1) * 10 : randX * 10;
    randomYPos = randY % 2 !== 0 ? (randY - 1) * 10 : randY * 10;

    if (!isInsideSnake(randomXPos, randomYPos)) break;
  }

  food.x = randomXPos;
  food.y = randomYPos;
}

function isInsideSnake(x, y) {
  return snakeBody.some((segment) => {
    return segment.x === x && segment.y === y;
  });
}
