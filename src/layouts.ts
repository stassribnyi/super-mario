import { LayerDrawer } from './compositor.js';
import { Background } from './loaders.js';
import SpriteSheet from './sprite-sheet.js';

export interface Position {
  x: number;
  y: number;
}

const drawBackground = (
  background: Background,
  context: CanvasRenderingContext2D,
  sprites: SpriteSheet
): void => background.ranges.forEach(([xStart, xEnd, yStart, yEnd]) => {
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      sprites.drawTile(background.tile, context, x, y);
    }
  }
});

export const createBackgroundLayer = (
  backgrounds: Array<Background>,
  sprites: SpriteSheet
): LayerDrawer => {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) =>
    drawBackground(background, buffer.getContext('2d'), sprites)
  );

  return (context) => context.drawImage(buffer, 0, 0);
};

export const createSpriteLayer =
  (sprite: SpriteSheet, position: Position): LayerDrawer =>
    (context) =>
      sprite.draw('idle', context, position.x, position.y);