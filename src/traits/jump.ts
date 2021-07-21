import Entity, { Trait } from '../entity.js';
export default class Jump extends Trait {
    private isReady = true;
    private velocity = 250;
    private engageTime = 0;
    private readonly duration = 0.2;

    constructor() {
        super('jump')
    }

    start(): void {
        if (this.isReady) {
            this.engageTime = this.duration;
        }

        this.isReady = false;
    }


    cancel(): void {
        this.engageTime = 0;
    }

    reset(): void {
        this.isReady = true;
    }

    update(entity: Entity, deltaTime: number): void {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}