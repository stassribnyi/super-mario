import Entity, { Trait } from '../entity.js';

export default class Velocity extends Trait {
    constructor() {
        super('velocity')
    }

    update(entity: Entity, deltaTime: number): void {
        entity.setPosition(
            entity.pos.x + entity.vel.x * deltaTime,
            entity.pos.y + entity.vel.y * deltaTime
        );
    }
}