import { loadImage } from './loaders.js';
import SpriteSheet from './sprite-sheet.js';

export const loadBackgroundSprites = async (): Promise<SpriteSheet> => {
    const image = await loadImage('/public/img/tiles.png');

    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile('ground', 0, 0);
    sprites.defineTile('sky', 3, 23);

    return sprites;
}

export const loadMarioSprites = async (): Promise<SpriteSheet> => {
    const image = await loadImage('/public/img/characters.gif');

    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('idle', 276, 44, 16, 16);

    return sprites;
}
