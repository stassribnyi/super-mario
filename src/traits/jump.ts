import Entity, { ObstructSide, Trait } from '../entity.js';
export default class Jump extends Trait {
    private isReady = true;
    private velocity = 200;
    private engageTime = 0;
    private requestTime = 0;
    private readonly duration = 0.3;
    private readonly speedBoost = 0.3;
    private readonly gracePeriod = 0.1;

    constructor() {
        super('jump');

        this.obstructHandler = (side) => {
            if (side === ObstructSide.Bottom) {
                this.reset();
            }

            if (side === ObstructSide.Top) {
                this.cancel();
            }
        }
    }

    get isFalling(): boolean {
        return !this.isReady && this.engageTime !== 0;
    }

    start(): void {
        this.requestTime = this.gracePeriod;
    }


    cancel(): void {
        this.requestTime = 0;
        this.engageTime = -1;
    }

    reset(): void {
        this.isReady = true;
        this.engageTime = 0;
    }

    update(entity: Entity, deltaTime: number): void {
        if (this.requestTime > 0) {
            if (this.isReady) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.isReady = false;
            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }
    }
}