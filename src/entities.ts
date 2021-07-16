import SpriteSheet from './sprite-sheet.js';
import Entity from './entity.js';
import { loadMarioSprites } from './sprites.js';
import { Jump, Run } from './traits/index.js';

export class Mario extends Entity {
    constructor(private readonly sprite: SpriteSheet) {
        super();
        this.setSize(14, 16)
    }

    draw(context: CanvasRenderingContext2D): void {
        this.sprite.draw('idle', context, this.pos.x, this.pos.y);
    }
}

export const createMario = async () => {
    const sprite = await loadMarioSprites();
    const mario = new Mario(sprite);
    mario.addTrait(new Run());
    mario.addTrait(new Jump());

    return mario;
}