import { LayerDrawer } from './compositor.js';
import Level, { LevelTile } from './level.js';
import { Matrix, Vector } from './math.js';
import SpriteSheet from './sprite-sheet.js';
import TileResolver from './tile-resolver.js';

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

export const createCollisionLayer =
  (tileResolver: TileResolver): LayerDrawer => {
    const resolvedTiles = new Set<Vector>();
    const getByIndexOriginal = tileResolver.getByIndex;
    const tileSize = tileResolver.tileSize;

    tileResolver.getByIndex = (indexX, indexY) => {
      resolvedTiles.add(new Vector(indexX * tileSize, indexY * tileSize));

      return getByIndexOriginal.call(tileResolver, indexX, indexY);
    }

    return (context) => {
      context.strokeStyle = 'red';

      resolvedTiles.forEach(({ x, y }) => {
        context.beginPath();
        context.rect(x, y, tileSize, tileSize);
        context.stroke();
      });

      resolvedTiles.clear();
    }
  }
