import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';

import Keyboard from './keyboard-state.js';
import Compositor from './compositor.js';
import Timer from './timer.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([loadBackgroundSprites(), loadLevel('1-1'), createMario()]).then(
  ([backgroundSprites, level, mario]) => {
    const compositor = new Compositor();

    const gravity = 2000;

    mario.positionVector.set(64, 180);
    mario.velocityVector.set(200, -600);

    const SPACE = 32;
    const input = new Keyboard();

    input.addMapping(SPACE, keyState => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });
    input.listenTo(window);

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    const spritesLayer = createSpriteLayer(mario);

    compositor.layers.push(backgroundLayer);
    compositor.layers.push(spritesLayer);

    const timer = new Timer();

    timer.update = function update(deltaTime) {
      compositor.draw(context);

      mario.update(deltaTime);

      mario.velocityVector.y += gravity * deltaTime;
    };

    timer.start();
  }
);
