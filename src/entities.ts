import SpriteSheet from './sprite-sheet.js';
import Entity, { ObstructSide } from './entity.js';
import { loadSpriteSheet } from './loaders.js';
import { Direction, Jump, Run } from './traits/index.js';

export class Mario extends Entity {
    constructor(private readonly sprite: SpriteSheet) {
        super();
        this.setSize(14, 16);
        this.obstructHandler = (side) => {
            if (side === ObstructSide.Bottom) {
                this.jump.reset();
            }

            if (side === ObstructSide.Top) {
                this.jump.cancel();
            }
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        const direction = this.run.getDirection();
        const isMirrored = direction === Direction.Backward;

        this.sprite.draw(this.getFrame(), context, 0, 0, isMirrored);
    }

    private getFrame(): string {
        const distance = this.run.getDistance();
        const direction = this.run.getDirection();
        const runAnimation = this.sprite.getAnimation('run');

        if (this.jump.engageTime !== 0) {
            return 'jump'
        }

        if (distance <= 0 || !runAnimation) {
            return 'idle';
        }

        if (this.vel.x > 0 && direction < 0 || this.vel.x < 0 && direction > 0) {
            return 'break';
        }

        return runAnimation(distance);
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