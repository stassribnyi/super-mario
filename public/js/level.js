import TileCollider from './tile-collider.js';
import Compositor from './compositor.js';
import { Matrix } from './math.js';

export default class Level {
  constructor() {
    this.compositor = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();

    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      this.tileCollider.test(entity);
    });
  }
}
