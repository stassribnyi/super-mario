import Entity from './entity.js';
import Velocity from './traits/index.js'
import { loadMarioSprites } from './sprites.js';

export function createMario() {
  return loadMarioSprites().then(marioSprites => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.draw = function drawMario(context) {
      marioSprites.draw('idle', context, this.position.x, this.position.y);
    };

    return mario;
  });
}
