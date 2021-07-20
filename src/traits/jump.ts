import Entity, { Trait } from '../entity.js';
export default class Jump extends Trait {
    private velocity = 250;
    private engageTime = 0;
    private readonly duration = 0.2;

    constructor() {
        super('jump')
    }

    start(): void {
        this.engageTime = this.duration;
    }

    cancel(): void {
        this.engageTime = 0;
    }

    update(entity: Entity, deltaTime: number): void {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}