import Entity, { Trait } from '../entity.js';

export enum Direction {
    Backward = -1,
    Forward = 1
}

const WALK_DRAG_FACTOR = 1 / 1000;
const RUN_DRAG_FACTOR = 1 / 1000;

export default class Run extends Trait {
    private _distance = 0;
    private _direction = Direction.Forward;

    private acceleration = 0;
    private deceleration = 300;
    private dragFactor = WALK_DRAG_FACTOR;

    constructor() {
        super('run')
    }

    get direction(): Direction {
        return this._direction;
    }

    private set direction(value: Direction) {
        this._direction = value;
    }

    get distance(): number {
        return this._distance;
    }

    private set distance(value: number) {
        this._distance = value;
    }

    start(direction?: Direction): void {
        this._direction = direction || this._direction;
        this.acceleration = 400 * this._direction;
    }

    cancel(): void {
        this.acceleration = 0;
    }

    turbo(isBoost: boolean) {
        this.dragFactor = isBoost ? RUN_DRAG_FACTOR : WALK_DRAG_FACTOR;
    }

    update(entity: Entity, deltaTime: number): void {
        const absX = Math.abs(entity.vel.x);

        if (this.acceleration !== 0) {
            entity.vel.x += this.acceleration * deltaTime;
        } else if (absX !== 0) {
            const decelerateX = Math.min(absX, this.deceleration * deltaTime);

            entity.vel.x += entity.vel.x > 0 ? -decelerateX : decelerateX;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;
        this.distance += absX * deltaTime;
    }
}