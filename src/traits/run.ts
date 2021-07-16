import Entity, { Trait } from '../entity.js';

export default class Jump extends Trait {
    private velocity = 0;

    constructor() {
        super('run')
    }

    start(direction: 'backward' | 'forward' = 'forward'): void {
        this.velocity = 200 * (direction === 'backward' ? -1 : 1);
    }

    cancel(): void {
        this.velocity = 0;
    }

    update(entity: Entity, deltaTime: number): void {
        entity.vel.x = this.velocity;
    }
}