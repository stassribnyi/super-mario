import Entity from './entity.js';
import { loadMarioSprites } from './sprites.js';

export function createMario() {
  return loadMarioSprites().then(marioSprites => {
    const mario = new Entity();

    mario.update = function updateMario(deltaTime) {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
    };

    mario.draw = function drawMario(context) {
      marioSprites.draw('idle', context, this.position.x, this.position.y);
    };

    return mario;
  });
}
