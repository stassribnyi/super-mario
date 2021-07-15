import Entity, { Trait } from '../entity.js';

export default class Velocity extends Trait {
    static readonly NAME = 'velocity';

    constructor() {
        super(Velocity.NAME)
    }

    update(entity: Entity, deltaTime: number): void {
        entity.setPosition(
            entity.pos.x + entity.vel.x * deltaTime,
            entity.pos.y + entity.vel.y * deltaTime
        );
    }
}