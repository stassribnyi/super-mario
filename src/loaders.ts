import { createBackgroundLayer, createSpriteLayer } from './layouts.js';
import { loadBackgroundSprites } from './sprites.js';
import Level, { LevelTile } from './level.js';
import Compositor from './compositor.js';
import { Matrix } from './math.js';

export type BackgroundRange = [number, number, number, number];

export interface Background {
    readonly tile: string;
    readonly ranges: Array<BackgroundRange>
}
export interface LevelSpec {
    readonly backgrounds: Array<Background>
}

export const loadImage =
    (url: string): Promise<HTMLImageElement> =>
        new Promise(resolve => {
            const image = new Image();

            image.addEventListener('load', () => resolve(image));
            image.src = url;
        });

const createTiles = (backgrounds: LevelSpec['backgrounds']): Matrix<LevelTile> => {
    const tiles = new Matrix<LevelTile>();

    backgrounds.forEach(({ tile, ranges }) =>
        ranges.forEach(([xStart, xEnd, yStart, yEnd]) => {
            for (let x = xStart; x < xEnd; x++) {
                for (let y = yStart; y < yEnd; y++) {
                    tiles.set(x, y, { name: tile })
                }
            }
        })
    );

    return tiles;
}

export const loadLevel =
    (level: string): Promise<Level> =>
        Promise.all([
            fetch(`/public/levels/${level}.json`)
                .then((response) => response.json() as Promise<LevelSpec>),
            loadBackgroundSprites()
        ])
            .then(([levelSpec, sprites]) => {
                const compositor = new Compositor();
                const tiles = createTiles(levelSpec.backgrounds)
                const level = new Level(compositor, tiles);

                const backgroundLayer = createBackgroundLayer(tiles, sprites);
                const spriteLayer = createSpriteLayer(level.entities);

                compositor.addLayer(backgroundLayer);
                compositor.addLayer(spriteLayer);

                return level;
            });
