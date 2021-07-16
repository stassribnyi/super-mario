import { LevelTile } from './level.js';
import { Matrix } from './math.js';

interface ResolvedTile {
    tile: LevelTile;
    y1: number;
    x1: number;
    y2: number;
    x2: number;
}

export default class TileResolver {
    constructor(
        private readonly tiles: Matrix<LevelTile>,
        readonly tileSize: number = 16
    ) { }

    toIndex(position: number): number {
        return Math.floor(position / this.tileSize);
    }

    getByIndex(indexX: number, indexY: number): ResolvedTile {
        const tile = this.tiles.get(indexX, indexY);

        if (!tile) {
            return;
        }

        const x1 = indexX * this.tileSize;
        const x2 = x1 + this.tileSize;

        const y1 = indexY * this.tileSize;
        const y2 = y1 + this.tileSize;

        return {
            tile,
            x1, y1,
            x2, y2
        }
    }

    matchByPosition(positionX: number, positionY: number): ResolvedTile {
        return this.getByIndex(
            this.toIndex(positionX),
            this.toIndex(positionY)
        );
    }
}
