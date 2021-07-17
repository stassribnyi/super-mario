import { loadImage } from './loaders.js';
import SpriteSheet from './sprite-sheet.js';

export const loadMarioSprites = async (): Promise<SpriteSheet> => {
    const image = await loadImage('/public/img/characters.gif');

    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('idle', 276, 44, 16, 16);

    return sprites;
}
