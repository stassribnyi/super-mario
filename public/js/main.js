import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';

import Compositor from './compositor.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([loadBackgroundSprites(), loadLevel('1-1'), createMario()]).then(
  ([backgroundSprites, level, mario]) => {
    const compositor = new Compositor();

    const gravity = 0.5;

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    const spritesLayer = createSpriteLayer(mario);

    compositor.layers.push(backgroundLayer);
    compositor.layers.push(spritesLayer);

    function update() {
      compositor.draw(context);

      mario.update();

      mario.velocity.y += gravity;

      requestAnimationFrame(update);
    }

    update();
  }
);
