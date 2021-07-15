import SpriteSheet from './sprite-sheet.js';
import Entity from './entity.js';
import { loadMarioSprites } from './sprites.js';

export class Mario extends Entity {
    constructor(private sprite: SpriteSheet) {
        super();
    }

    draw(context: CanvasRenderingContext2D): void {
        this.sprite.draw('idle', context, this.pos.x, this.pos.y);
    }

    update(deltaTime: number): void {
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    }
}

export const createMario = async () => {
    const sprite = await loadMarioSprites();
    const mario = new Mario(sprite);

    return mario;
}