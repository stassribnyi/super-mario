import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadBackgroundSprites } from './sprites.js';

import Level from './level.js';

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.src = url;
  });
}

export function loadLevel(lvlName) {
  return Promise.all([
    loadBackgroundSprites(),
    fetch(`/levels/${lvlName}.json`).then(result => result.json())
  ]).then(([backgroundSprites, levelSpec]) => {
    const level = new Level();
    const backgroundLayer = createBackgroundLayer(
      levelSpec.backgrounds,
      backgroundSprites
    );
    const spritesLayer = createSpriteLayer(level.entities);

    level.compositor.layers.push(backgroundLayer);
    level.compositor.layers.push(spritesLayer);

    return level;
  });
}
