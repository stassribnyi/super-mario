import { Vector } from './math.js';

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  update() {
    console.warn('Unhandled update call in Trait');
  }
}

export default class Entity {
  constructor() {
    this.positionVector = new Vector(0, 0);
    this.velocityVector = new Vector(0, 0);

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    });
  }
}
