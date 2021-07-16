import Compositor from './compositor.js';
import Entity from './entity.js';
import TileCollider from './tile-collider.js';

export interface LevelTile {
    readonly name: string;
}

export default class Level {
    readonly entities = new Set<Entity>();

    constructor(private compositor: Compositor, private tileCollider: TileCollider) { }

    draw(context: CanvasRenderingContext2D): void {
        this.compositor.draw(context);
    }

    update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x = entity.pos.x + entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y = entity.pos.y + entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);
        });
    }
}