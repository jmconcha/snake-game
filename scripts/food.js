function Food() {
  // food color
  this.color = '#ffff00';

  // food x, and y position
  this.x = 100;
  this.y = 100;
  // food width, and height
  this.width = 10;
  this.height = 10;

  this.updateFood = function () {
    let randX, randY, randomXPos, randomYPos;

    while (true) {
      randX = Math.floor(Math.random() * (canvasWidth / boxSize));
      randY = Math.floor(Math.random() * (canvasHeight / boxSize));

      randomXPos = randX % 2 !== 0 ? (randX - 1) * 10 : randX * 10;
      randomYPos = randY % 2 !== 0 ? (randY - 1) * 10 : randY * 10;

      if (!this.isInsideSnake(randomXPos, randomYPos)) break;
    }

    this.x = randomXPos;
    this.y = randomYPos;
  };

  this.drawFood = function () {
    // draw food on the screen
    // food color yellow
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, food.width, food.height);
  };

  this.isInsideSnake = function (x, y) {
    return snake.snakeBody.some((segment) => {
      return segment.x === x && segment.y === y;
    });
  };
}
