import { LayerDrawer } from './compositor.js';
import Level, { LevelTile } from './level.js';
import { Matrix } from './math.js';
import SpriteSheet from './sprite-sheet.js';

export const createBackgroundLayer = (
  tiles: Matrix<LevelTile>,
  sprites: SpriteSheet
): LayerDrawer => {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  tiles.forEach((x, y, tile) =>
    sprites.drawTile(tile.name, buffer.getContext('2d'), x, y)
  );

  return (context) => context.drawImage(buffer, 0, 0);
};

export const createSpriteLayer =
  (entities: Level['entities']): LayerDrawer =>
    (context) =>
      entities.forEach(entity => entity.draw(context));
