import Entity, { Trait } from '../entity.js';

export enum Direction {
    Backward = -1,
    Forward = 1
}
export default class Run extends Trait {
    private distance = 0;
    private acceleration = 0;
    private deceleration = 300;
    private readonly dragFactor = 1 / 5000;
    private direction = Direction.Forward;

    constructor() {
        super('run')
    }

    start(direction?: Direction): void {
        this.direction = direction || this.direction;
        this.acceleration = 400 * this.direction;
    }

    cancel(): void {
        this.acceleration = 0;
    }

    update(entity: Entity, deltaTime: number): void {
        const absX = Math.abs(entity.vel.x);

        if (this.acceleration !== 0) {
            entity.vel.x += this.acceleration * deltaTime;
        } else if (absX !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);

            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;
        this.distance += absX * deltaTime;

    }

    getDirection(): Direction {
        return this.direction;
    }

    getDistance(): number {
        return this.distance;
    }
}