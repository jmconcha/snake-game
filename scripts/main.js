// how many render per second
// this will be the snake speed
const renderPerSec = 2;
// last render timestamp
let lastRenderTime = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);

  // milliseconds since last render
  let lastRenderMS = (currentTime - lastRenderTime) / 1000;
  // controls how many render per sec
  if (lastRenderMS < 1 / renderPerSec) return;

  console.log(currentTime);
  lastRenderTime = currentTime;
}

main();
