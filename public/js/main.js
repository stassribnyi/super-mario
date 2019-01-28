import SpriteSheet from './sprite-sheet.js';
import { loadImage } from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/img/tiles.png').then(image => {
  const sprites = new SpriteSheet(image, 16, 16); // tile sieze is 16 x 16
  sprites.define('ground', 0, 0);
  sprites.draw('ground', context, 45, 62);
});
