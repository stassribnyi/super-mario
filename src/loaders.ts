import { createBackgroundLayer, createSpriteLayer } from './layouts.js';
import { loadBackgroundSprites } from './sprites.js';
import Level from './level.js';
import Compositor from './compositor.js';

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

export const loadLevel =
    (level: string): Promise<Level> =>
        Promise.all([
            fetch(`/public/levels/${level}.json`)
                .then((response) => response.json() as Promise<LevelSpec>),
            loadBackgroundSprites()
        ])
            .then(([levelSpec, sprites]) => {
                const compositor = new Compositor();
                const level = new Level(compositor);

                const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, sprites);
                const spriteLayer = createSpriteLayer(level.entities);

                compositor.addLayer(backgroundLayer);
                compositor.addLayer(spriteLayer);

                return level;
            });
