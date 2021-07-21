import Entity, { ObstructSide } from './entity.js';
import { Vector } from './math.js';
import TileResolver from './tile-resolver.js';

export default class TileCollider {
    constructor(private readonly tilesResolver: TileResolver) { }

    checkOrdinate = (entity: Entity, ordinate: keyof Pick<Vector, 'x' | 'y'>): void => {
        if (!entity.vel[ordinate]) {
            return;
        }

        const obstructionSides = ordinate === 'x'
            ? [ObstructSide.Right, ObstructSide.Left]
            : [ObstructSide.Bottom, ObstructSide.Top];

        const ordinateValue = entity.vel[ordinate] > 0
            ? entity.pos[ordinate] + entity.size[ordinate]
            : entity.pos[ordinate];

        const matchOrdinateOne = `${ordinate}1`;
        const matchOrdinateTwo = `${ordinate}2`;

        const matchParams: [number, number, number, number] = ordinate === 'x'
            ? [ordinateValue, ordinateValue, entity.pos.y, entity.pos.y + entity.size.y]
            : [entity.pos.x, entity.pos.x + entity.size.x, ordinateValue, ordinateValue];

        const matches = this.tilesResolver.searchByRange(...matchParams)

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel[ordinate] > 0) {
                if (entity.pos[ordinate] + entity.size[ordinate] > match[matchOrdinateOne]) {
                    entity.pos[ordinate] = match[matchOrdinateOne] - entity.size[ordinate];
                    entity.vel[ordinate] = 0;

                    entity.obstruct(obstructionSides[0]);
                }
            } else if (entity.vel[ordinate] < 0) {
                if (entity.pos[ordinate] < match[matchOrdinateTwo]) {
                    entity.pos[ordinate] = match[matchOrdinateTwo];
                    entity.vel[ordinate] = 0;

                    entity.obstruct(obstructionSides[1]);
                }
            }
        })
    }

    checkX = (entity: Entity): void => {
        this.checkOrdinate(entity, 'x');
    }

    checkY = (entity: Entity): void => {
        this.checkOrdinate(entity, 'y');
    }
}