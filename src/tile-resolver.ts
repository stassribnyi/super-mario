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

    toIndexRange(positionStart: number, positionEnd: number): Array<number> {
        const positionMax = Math.ceil(positionEnd / this.tileSize) * this.tileSize;
        const range = [];
        let currentPosition = positionStart;

        do {
            range.push(this.toIndex(currentPosition));
            currentPosition += this.tileSize;
        } while (currentPosition < positionMax);

        return range;
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

    getTiles(): Matrix<LevelTile> {
        return this.tiles;
    }

    searchByPosition(positionX: number, positionY: number): ResolvedTile {
        return this.getByIndex(
            this.toIndex(positionX),
            this.toIndex(positionY)
        );
    }

    searchByRange(
        x1: number, x2: number,
        y1: number, y2: number
    ): Array<ResolvedTile> {
        const matches = [];

        this.toIndexRange(x1, x2).forEach(indexX =>
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(this.getByIndex(indexX, indexY))
                }
            })
        );

        return matches;
    }
}
