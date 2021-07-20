import Entity, { Trait } from '../entity.js';

export enum Direction {
    Backward = -1,
    Forward = 1
}
export default class Run extends Trait {
    private speed = 0;
    private distance = 0;
    private direction = Direction.Forward;

    constructor() {
        super('run')
    }

    start(direction?: Direction): void {
        this.direction = direction || this.direction;
        this.speed = 6000 * this.direction;
    }

    cancel(): void {
        this.speed = 0;
        this.distance = 0;
    }

    update(entity: Entity, deltaTime: number): void {
        entity.vel.x = this.speed * deltaTime;
        this.distance += Math.abs(entity.vel.x) * deltaTime;
    }

    getDirection(): Direction {
        return this.direction;
    }

    getDistance(): number {
        return this.distance;
    }
}