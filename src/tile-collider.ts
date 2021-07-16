import Entity from './entity.js';
import TileResolver from './tile-resolver.js';

export default class TileCollider {
    constructor(private readonly tilesResolver: TileResolver) { }

    checkY(entity: Entity) {
        const match = this.tilesResolver.matchByPosition(entity.pos.x, entity.pos.y);

        if (!match) {
            return;
        }

        if (match.tile.name !== 'ground') {
            return;
        }

        if (entity.vel.y > 0) {
            if (entity.pos.y > match.y1) {
                entity.pos.y = match.y1;
                entity.vel.y = 0;
            }
        }

        // console.log('test');

    }

    test(entity: Entity) {
        this.checkY(entity);
    }
}