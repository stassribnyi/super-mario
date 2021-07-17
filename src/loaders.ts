import { createBackgroundLayer, createCollisionLayer, createSpriteLayer } from './layouts.js';
import Level, { LevelTile } from './level.js';
import Compositor from './compositor.js';
import { Matrix } from './math.js';
import TileCollider from './tile-collider.js';
import TileResolver from './tile-resolver.js';
import SpriteSheet from './sprite-sheet.js';

export type BackgroundRange =
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];

export interface SpriteSheetSpec {
    readonly imageUrl: string;
    readonly tileWidth: number;
    readonly tileHeight: number;
    readonly tiles: Array<{
        readonly name: string;
        readonly position: [x: number, y: number];
    }>
}
export interface Background {
    readonly tile: string;
    readonly type: string;
    readonly ranges: Array<BackgroundRange>
}
export interface LevelSpec {
    readonly spriteSheet: string;
    readonly backgrounds: Array<Background>;
}

export const loadImage =
    (url: string): Promise<HTMLImageElement> =>
        new Promise(resolve => {
            const image = new Image();

            image.addEventListener('load', () => resolve(image));
            image.src = url;
        });

const loadJSON = <T extends object>(url: string): Promise<T> =>
    fetch(url).then((response) => response.json() as Promise<T>);

const createTiles = (backgrounds: LevelSpec['backgrounds']): Matrix<LevelTile> => {
    const tiles = new Matrix<LevelTile>();

    backgrounds.forEach(({ tile: name, type, ranges }) => {
        const applyRange = ([xStart, xLen, yStart, yLen]) => {
            const xEnd = xStart + xLen;
            const yEnd = yStart + yLen;

            for (let x = xStart; x < xEnd; x++) {
                for (let y = yStart; y < yEnd; y++) {
                    tiles.set(x, y, { name, type })
                }
            }
        }

        ranges.forEach((range) => {
            if (range.length === 4) {
                applyRange(range);

                return;
            }

            if (range.length === 3) {
                applyRange([...range, 1]);

                return;
            }

            applyRange([range[0], 1, range[1], 1]);
        });
    });

    return tiles;
}

const loadSpriteSheet = async (name: string): Promise<SpriteSheet> => {
    const {
        imageUrl,
        tiles,
        tileHeight,
        tileWidth
    } = await loadJSON<SpriteSheetSpec>(`/public/sprites/${name}.json`);

    const image = await loadImage(imageUrl);

    const sprites = new SpriteSheet(image, tileWidth, tileHeight);
    tiles.forEach(({ name: tileName, position: [x, y] }) =>
        sprites.defineTile(tileName, x, y)
    );

    return sprites;

}

export const loadLevel =
    async (name: string): Promise<Level> => {
        const {
            backgrounds,
            spriteSheet
        } = await loadJSON<LevelSpec>(`/public/levels/${name}.json`);

        const sprites = await loadSpriteSheet(spriteSheet)

        const compositor = new Compositor();
        const tiles = createTiles(backgrounds);

        const tileResolver = new TileResolver(tiles);
        const tileCollider = new TileCollider(tileResolver);

        const level = new Level(compositor, tileCollider);

        const backgroundLayer = createBackgroundLayer(tiles, sprites);
        const spriteLayer = createSpriteLayer(level.entities);
        const collisionLayer = createCollisionLayer(level.entities, tileResolver);

        compositor.addLayer(backgroundLayer);
        compositor.addLayer(spriteLayer);
        compositor.addLayer(collisionLayer);

        return level;
    }
