import SpriteSheet from './sprite-sheet.js';
import { loadImage, loadLevel } from './loaders.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

function loadMarioSprites() {
  return loadImage('/img/characters.gif').then(image => {
    const sprites = new SpriteSheet(image, 16, 16); // tile sieze is 16 x 16
    sprites.define('idle', 276, 44, 16, 16);

    return sprites;
  });
}

function loadBackgroundSprites() {
  return loadImage('/img/tiles.png').then(image => {
    const sprites = new SpriteSheet(image, 16, 16); // tile sieze is 16 x 16
    sprites.defineTile('ground', 0, 0);
    sprites.defineTile('sky', 3, 23);

    return sprites;
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([
  loadBackgroundSprites(),
  loadMarioSprites(),
  loadLevel('1-1')
]).then(([sprites, loadMarioSprites, level]) => {
  level.backgrounds.forEach(background =>
    drawBackground(background, context, sprites)
  );

  loadMarioSprites.draw('idle', context, 64, 64);
});
