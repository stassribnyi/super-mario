import { Trait } from '../entity.js';

export class Velocity extends Trait {
  constructor() {
    super('velocity');
  }

  update(entity, deltaTime) {
    entity.position.x += entity.velocity.x * deltaTime;
    entity.position.y += entity.velocity.y * deltaTime;
  }
}
