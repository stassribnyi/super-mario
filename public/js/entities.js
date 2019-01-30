import Entity from './entity.js';
import { loadMarioSprites } from './sprites.js';

export function createMario() {
  return loadMarioSprites().then(marioSprites => {
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

    return mario;
  });
}
