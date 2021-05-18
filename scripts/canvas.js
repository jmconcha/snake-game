const gameBoard = document.getElementById('game-board');
const canvasWidth = 500;
const canvasHeight = 500;
gameBoard.width = canvasWidth;
gameBoard.height = canvasHeight;
const ctx = gameBoard.getContext('2d');
// boxSize is the size of each box inside the canvas
const boxSize = 20;
