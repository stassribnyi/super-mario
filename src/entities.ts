import SpriteSheet from './sprite-sheet.js';
import Entity from './entity.js';
import { loadSpriteSheet } from './loaders.js';
import { Direction, Jump, Run } from './traits/index.js';
import { createAnimation, Animation } from './animation.js';

export class Mario extends Entity {
    private readonly runAnimation: Animation;

    constructor(private readonly sprite: SpriteSheet) {
        super();
        this.setSize(14, 16);
        this.runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 10);
    }

    draw(context: CanvasRenderingContext2D): void {
        const direction = this.run.getDirection();
        const isMirrored = direction === Direction.Backward;

        this.sprite.draw(this.getFrame(), context, 0, 0, isMirrored);
    }

    private getFrame(): string {
        const distance = this.run.getDistance();

        if (distance) {
            return this.runAnimation(distance);
        }

        return 'idle';
    }
}

export const createMario = async (x: number = 16, y: number = 16) => {
    const sprite = await loadSpriteSheet('mario');

    const mario = new Mario(sprite);

    mario.addTrait(new Run());
    mario.addTrait(new Jump());

    mario.setPosition(x, y);

    return mario;
}