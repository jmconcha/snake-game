function Snake() {
  // snake color
  this.color = '#fff';

  // body of snake compose of segments
  this.snakeBody = [
    {
      x: 180,
      y: 180,
    },
  ];

  // width and height of snake segments/parts
  this.snakeSegmentSize = {
    width: 10,
    height: 10,
  };

  // snake direction
  this.snakeDirection = {
    x: 0,
    y: 0,
  };

  // update all snake data
  this.updateSnake = function () {
    // checks if snake ate the food
    this.onSnakeEat();

    for (let i = this.snakeBody.length - 1; i > 0; i--) {
      this.snakeBody[i] = { ...this.snakeBody[i - 1] };
    }

    // update snake position
    this.snakeBody[0].x += this.snakeDirection.x;
    this.snakeBody[0].y += this.snakeDirection.y;
  };

  // draw snake and food on the screen
  this.drawSnake = function () {
    // doesn't draw if game over
    if (this.isGameOver) alert('gameover');

    // draw snake
    ctx.fillStyle = this.color;
    this.snakeBody.forEach((segment) => {
      ctx.fillRect(
        segment.x,
        segment.y,
        this.snakeSegmentSize.width,
        this.snakeSegmentSize.height
      );
    });
  };

  // checks if snake intersected on its own body or on the boundaries
  // which means snake is dead and the game is over
  this.isDead = function () {
    return this.isSnakeIntersected() || this.isBoundaryIntersected();
  };

  // check if snake head intersected to its body
  this.isSnakeIntersected = function () {
    return this.snakeBody.some((segment, idx) => {
      if (idx !== 0) {
        // snakeBody[0] is snake's head
        if (
          segment.x === this.snakeBody[0].x &&
          segment.y === this.snakeBody[0].y
        )
          return true;
      }
    });
  };

  // check if snake head intersected to the boundaries
  this.isBoundaryIntersected = function () {
    // snake[0] is the snake's head
    return (
      this.snakeBody[0].x < 0 ||
      this.snakeBody[0].x > canvasWidth ||
      this.snakeBody[0].y < 0 ||
      this.snakeBody[0].y > canvasHeight
    );
  };

  // update snake direction
  this.setSnakeDirection = function (direction) {
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
        if (this.snakeDirection.x !== -this.snakeSegmentSize.width) {
          this.snakeDirection.x = this.snakeSegmentSize.width;
          this.snakeDirection.y = 0;
        }
        break;
      case 'left':
        if (this.snakeDirection.x !== this.snakeSegmentSize.width) {
          this.snakeDirection.x = -this.snakeSegmentSize.width;
          this.snakeDirection.y = 0;
        }
        break;
      case 'up':
        if (this.snakeDirection.y !== this.snakeSegmentSize.height) {
          this.snakeDirection.y = -this.snakeSegmentSize.height;
          this.snakeDirection.x = 0;
        }
        break;
      case 'down':
        if (this.snakeDirection.y !== -this.snakeSegmentSize.height) {
          this.snakeDirection.y = this.snakeSegmentSize.height;
          this.snakeDirection.x = 0;
        }
        break;
      default:
        return undefined;
    }
  };

  // returns snake last segment or the tail of the snake
  this.getLastSnakeSegment = function () {
    return this.snakeBody[this.snakeBody.length - 1];
  };

  this.addSnakeSegment = function () {
    // get last snake segment to know x position and y position
    const lastSnakeSegment = this.getLastSnakeSegment();
    const newSegment = {};

    if (this.snakeDirection.x > 0) {
      newSegment.x = lastSnakeSegment.x - this.snakeSegmentSize.width;
      newSegment.y = this.snakeSegmentSize.y;
    } else if (this.snakeDirection.x < 0) {
      newSegment.x = lastSnakeSegment.x;
      newSegment.y = this.snakeSegmentSize.y;
    } else if (this.snakeDirection.y > 0) {
      newSegment.x = this.snakeSegmentSize.x;
      newSegment.y = lastSnakeSegment.y;
    } else if (this.snakeDirection.y < 0) {
      newSegment.x = lastSnakeSegment.x;
      newSegment.y = lastSnakeSegment.y + this.snakeSegmentSize.height;
    }

    this.snakeBody.push(newSegment);
  };

  // checks if snake ate the food
  // if snake head positions is the same as food positions
  // the food is eaten
  this.onSnakeEat = function () {
    // snakeBody[0] is snake's head
    if (this.snakeBody[0].x === food.x && this.snakeBody[0].y === food.y) {
      // add new snake segment to snake body/ tail
      this.addSnakeSegment();
      // generate new food
      food.updateFood();
    }
  };
}
