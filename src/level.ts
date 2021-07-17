import Camera from './camera.js';
import Compositor from './compositor.js';
import Entity from './entity.js';
import TileCollider from './tile-collider.js';

export interface LevelTile {
    readonly name: string;
    readonly type: string;
}

export default class Level {
    readonly entities = new Set<Entity>();
    private gravity = 2000;

    constructor(private compositor: Compositor, private tileCollider: TileCollider) { }

    draw(context: CanvasRenderingContext2D, camera: Camera): void {
        this.compositor.draw(context, camera);
    }

    update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.setPosition(entity.pos.x + entity.vel.x * deltaTime, entity.pos.y);
            this.tileCollider.checkX(entity);

            entity.setPosition(entity.pos.x, entity.pos.y + entity.vel.y * deltaTime);
            this.tileCollider.checkY(entity);

            entity.setVelocity(entity.vel.x, entity.vel.y + this.gravity * deltaTime);
        });
    }
}