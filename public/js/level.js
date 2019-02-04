import Compositor from './compositor.js';

import { Matrix } from './math.js';

export default class Level {
  constructor() {
    this.compositor = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
  }

  update(deltaTime) {
    this.entities.forEach(entity => entity.update(deltaTime));
  }
}