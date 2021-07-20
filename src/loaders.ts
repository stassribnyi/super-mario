import { createBackgroundLayer, createCameraLayer, createCollisionLayer, createSpriteLayer } from './layouts.js';
import Level, { LevelTile } from './level.js';
import Compositor from './compositor.js';
import { Matrix } from './math.js';
import TileCollider from './tile-collider.js';
import TileResolver from './tile-resolver.js';
import SpriteSheet from './sprite-sheet.js';
import Camera from './camera.js';
import { createAnimation } from './animation.js';

export type BackgroundRange =
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];

export interface SpriteSheetSpec {
    readonly imageUrl: string;
    readonly width?: number;
    readonly height?: number;
    readonly tiles: Array<{
        readonly name: string;
        readonly position: [x: number, y: number] | [x: number, y: number, w: number, h: number];
    }>
    readonly animations?: Array<{
        readonly name: string;
        readonly frames: Array<string>;
        readonly frameLength: number;
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

export const loadSpriteSheet = async (name: string): Promise<SpriteSheet> => {
    const spriteSpec = await loadJSON<SpriteSheetSpec>(`/public/sprites/${name}.json`);
    const { animations, imageUrl, tiles, width, height } = spriteSpec;

    const image = await loadImage(imageUrl);

    const sprites = new SpriteSheet(image, width, height);

    tiles.forEach(({ name: tileName, position }) => {
        if (position.length === 2) {
            sprites.defineTile(tileName, ...position);

            return;
        }

        sprites.define(tileName, ...position);
    });

    animations?.forEach(({ name: animationName, frames, frameLength }) => {
        const animation = createAnimation(frames, frameLength);

        sprites.defineAnimation(animationName, animation)
    })

    return sprites;
}

export const loadLevel =
    async (name: string): Promise<[Level, Camera]> => {
        const {
            backgrounds,
            spriteSheet
        } = await loadJSON<LevelSpec>(`/public/levels/${name}.json`);

        const sprites = await loadSpriteSheet(spriteSheet)

        const camera = new Camera();
        const compositor = new Compositor();

        const tiles = createTiles(backgrounds);
        const tileResolver = new TileResolver(tiles);
        const tileCollider = new TileCollider(tileResolver);

        const level = new Level(compositor, tileCollider);

        const spriteLayer = createSpriteLayer(level.entities);
        const backgroundLayer = createBackgroundLayer(level, tileResolver, sprites);

        compositor.addLayer(backgroundLayer);
        compositor.addLayer(spriteLayer);

        // const cameraLayer = createCameraLayer(camera);
        // const collisionLayer = createCollisionLayer(level.entities, tileResolver);
        // compositor.addLayer(collisionLayer);
        // compositor.addLayer(cameraLayer);

        return [level, camera];
    }
