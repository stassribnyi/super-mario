import { LayerDrawer } from './compositor.js';
import Entity from './entity.js';
import Level, { LevelTile } from './level.js';
import { Matrix, Vector } from './math.js';
import SpriteSheet from './sprite-sheet.js';
import TileResolver from './tile-resolver.js';

function drawCollision(
  context: CanvasRenderingContext2D,
  color: CanvasRenderingContext2D['strokeStyle'],
  x: number, y: number,
  size: number
): void;
function drawCollision(
  context: CanvasRenderingContext2D,
  color: CanvasRenderingContext2D['strokeStyle'],
  x: number, y: number,
  width: number, height: number
): void;
function drawCollision(
  context: CanvasRenderingContext2D,
  color: CanvasRenderingContext2D['strokeStyle'],
  x: number, y: number,
  width: number, height?: number
): void {
  context.strokeStyle = color;
  context.beginPath();
  context.rect(x, y, width, height !== undefined ? height : width);
  context.stroke();
}

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
  (entities: Set<Entity>, tileResolver: TileResolver): LayerDrawer => {
    const resolvedTiles = new Set<Vector>();
    const getByIndexOriginal = tileResolver.getByIndex;
    const tileSize = tileResolver.tileSize;

    tileResolver.getByIndex = (indexX, indexY) => {
      resolvedTiles.add(new Vector(indexX * tileSize, indexY * tileSize));

      return getByIndexOriginal.call(tileResolver, indexX, indexY);
    }

    return (context) => {
      resolvedTiles.forEach(({ x, y }) => {
        drawCollision(context, 'blue', x, y, tileSize);
      });

      resolvedTiles.clear();

      entities.forEach(({ pos, size }) => {
        drawCollision(context, 'red', pos.x, pos.y, size.x, size.y);
      });
    }
  }
