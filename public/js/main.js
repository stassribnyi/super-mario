import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';
import { loadLevel } from './loaders.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([
  loadBackgroundSprites(),
  loadMarioSprites(),
  loadLevel('1-1')
]).then(([sprites, marioSprites, level]) => {
  const backgroundBuffer = document.createElement('canvas');
  backgroundBuffer.width = 256;
  backgroundBuffer.height = 240;

  level.backgrounds.forEach(background =>
    drawBackground(background, backgroundBuffer.getContext('2d'), sprites)
  );

  const position = {
    x: 64,
    y: 64
  };

  function update() {
    context.drawImage(backgroundBuffer, 0, 0);

    marioSprites.draw('idle', context, position.x, position.y);

    position.x += 2;
    position.y += 2;

    requestAnimationFrame(update);
  }

  update();
});
