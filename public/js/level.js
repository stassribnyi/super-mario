import Compositor from './compositor.js';

export default class Level {
  constructor() {
    this.compositor = new Compositor();
    this.entities = new Set();
  }
}
