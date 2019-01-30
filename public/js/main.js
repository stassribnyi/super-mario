import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadLevel } from './loaders.js';

import Compositor from './compositor.js';
import Entity from './entity.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
Promise.all([
  loadBackgroundSprites(),
  loadMarioSprites(),
  loadLevel('1-1')
]).then(([backgroundSprites, marioSprites, level]) => {
  const compositor = new Compositor();

  const gravity = 0.5;

  const mario = new Entity();

  mario.position.set(64, 180);
  mario.velocity.set(2, -10);

  mario.update = function updateMario() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  mario.draw = function drawMario(context) {
    marioSprites.draw('idle', context, this.position.x, this.position.y);
  };

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
});
