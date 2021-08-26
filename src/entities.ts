import SpriteSheet from './sprite-sheet.js';
import Entity from './entity.js';
import { loadSpriteSheet } from './loaders.js';
import { Direction, Jump, Run } from './traits/index.js';

export class Mario extends Entity {
    private direction = Direction.Forward;

    constructor(private readonly sprite: SpriteSheet) {
        super();
        this.setSize(14, 16);
    }

    draw(context: CanvasRenderingContext2D): void {
        if (!this.jump?.isFalling) {
            this.direction = this.run?.direction;
        }

        const isMirrored = this.direction === Direction.Backward;

        this.sprite.draw(this.getFrame(), context, 0, 0, isMirrored);
    }

    private getFrame(): string {
        const distance = this.run?.distance;
        const direction = this.run?.direction;
        const runAnimation = this.sprite.getAnimation('run');

        if (this.jump?.isFalling) {
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