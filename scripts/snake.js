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
  this.snakePrevDirection = {
    x: 0,
    y: 0,
  };
  // snake direction
  this.snakeCurrDirection = {
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

    // prevents snake from going backwards
    if (
      (this.snakePrevDirection.x > 0 &&
        this.snakeCurrDirection.x === -this.snakeSegmentSize.width) ||
      (this.snakePrevDirection.x < 0 &&
        this.snakeCurrDirection.x === this.snakeSegmentSize.width) ||
      (this.snakePrevDirection.y > 0 &&
        this.snakeCurrDirection.y === -this.snakeSegmentSize.width) ||
      (this.snakePrevDirection.y < 0 &&
        this.snakeCurrDirection.y === this.snakeSegmentSize.width)
    ) {
      // updates snake direction using snake prevous direction
      // and not the snake current direction
      // input by user
      // to prevent snake going backwards
      this.snakeBody[0].x += this.snakePrevDirection.x;
      this.snakeBody[0].y += this.snakePrevDirection.y;
    } else {
      // update snake position
      this.snakeBody[0].x += this.snakeCurrDirection.x;
      this.snakeBody[0].y += this.snakeCurrDirection.y;
      // update snake previous direction with the snake current direction
      this.snakePrevDirection.x = this.snakeCurrDirection.x;
      this.snakePrevDirection.y = this.snakeCurrDirection.y;
    }
  };

  // draw snake on the screen
  this.drawSnake = function () {
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

    // update snakeCurrDirection
    switch (direction) {
      case 'right':
        this.snakeCurrDirection.x = this.snakeSegmentSize.width;
        this.snakeCurrDirection.y = 0;
        break;
      case 'left':
        this.snakeCurrDirection.x = -this.snakeSegmentSize.width;
        this.snakeCurrDirection.y = 0;
        break;
      case 'up':
        this.snakeCurrDirection.y = -this.snakeSegmentSize.height;
        this.snakeCurrDirection.x = 0;
        break;
      case 'down':
        this.snakeCurrDirection.y = this.snakeSegmentSize.height;
        this.snakeCurrDirection.x = 0;
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

    if (this.snakeCurrDirection.x > 0) {
      newSegment.x = lastSnakeSegment.x - this.snakeSegmentSize.width;
      newSegment.y = this.snakeSegmentSize.y;
    } else if (this.snakeCurrDirection.x < 0) {
      newSegment.x = lastSnakeSegment.x;
      newSegment.y = this.snakeSegmentSize.y;
    } else if (this.snakeCurrDirection.y > 0) {
      newSegment.x = this.snakeSegmentSize.x;
      newSegment.y = lastSnakeSegment.y;
    } else if (this.snakeCurrDirection.y < 0) {
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
