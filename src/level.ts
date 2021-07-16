import Compositor from './compositor.js';
import Entity from './entity.js';

export default class Level {
    readonly entities = new Set<Entity>();

    constructor(private compositor: Compositor) { }

    draw(context: CanvasRenderingContext2D): void {
        this.compositor.draw(context);
    }

    update(deltaTime: number): void {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
}