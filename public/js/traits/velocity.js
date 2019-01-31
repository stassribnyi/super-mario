import { Trait } from '../entity.js';

export class Velocity extends Trait {
  constructor() {
    super('velocity');
  }

  update(entity, deltaTime) {
    entity.positionVector.x += entity.velocityVector.x * deltaTime;
    entity.positionVector.y += entity.velocityVector.y * deltaTime;
  }
}
