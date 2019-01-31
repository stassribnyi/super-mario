import Entity from './entity.js';
import { Velocity, Jump } from './traits/index.js';
import { loadMarioSprites } from './sprites.js';

export function createMario() {
  return loadMarioSprites().then(marioSprites => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());
    mario.draw = function drawMario(context) {
      marioSprites.draw('idle', context, this.positionVector.x, this.positionVector.y);
    };

    return mario;
  });
}
