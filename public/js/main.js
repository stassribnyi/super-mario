import { createCollisionLayer } from './layers.js';
import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';

import Keyboard from './keyboard-state.js';
import Timer from './timer.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([loadLevel('1-1'), createMario()]).then(([level, mario]) => {
  const gravity = 2000;

  mario.positionVector.set(64, 180);
  mario.velocityVector.set(0, -600);

  level.entities.add(mario);

  createCollisionLayer(level);

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

  // debugging

  ['mousedown', 'mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        mario.velocityVector.set(0, 0);
        mario.positionVector.set(event.offsetX, event.offsetY);
      }
    });
  });

  const timer = new Timer();

  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    level.compositor.draw(context);

    mario.velocityVector.y += gravity * deltaTime;
  };

  timer.start();
});
