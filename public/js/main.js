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

    const gravity = 30;
    
    mario.position.set(64, 180);
    mario.velocity.set(200, -600);

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    const spritesLayer = createSpriteLayer(mario);

    // compositor.layers.push(backgroundLayer);
    compositor.layers.push(spritesLayer);

    let deltaTime = 0;
    let lastTime = 0;

    function update(time) {
      deltaTime = (time - lastTime) / 1000;
    //   console.log(deltaTime, time);

      compositor.draw(context);

      mario.update(deltaTime);
       console.log(mario.position);

      mario.velocity.y += gravity;

      requestAnimationFrame(update);
      //   setTimeout(update, 1000 / 145);

      lastTime = time;
    }

    update(0);
  }
);
