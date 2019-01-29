import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import Compositor from './compositor.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([
  loadBackgroundSprites(),
  loadMarioSprites(),
  loadLevel('1-1')
]).then(([backgroundSprites, marioSprites, level]) => {
  const compositor = new Compositor();

  const position = {
    x: 64,
    y: 64
  };

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  const spritesLayer = createSpriteLayer(marioSprites, position);

  compositor.layers.push(backgroundLayer);
  compositor.layers.push(spritesLayer);

  function update() {
    compositor.draw(context);

    position.x += 2;
    position.y += 2;

    requestAnimationFrame(update);
  }

  update();
});
