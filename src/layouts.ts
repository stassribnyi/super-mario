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
  buffer.width = 2048;
  buffer.height = 240;

  tiles.forEach((x, y, tile) =>
    sprites.drawTile(tile.name, buffer.getContext('2d'), x, y)
  );

  return (context, camera) => context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
};

export const createSpriteLayer =
  (entities: Level['entities'],
    entityWidth: number = 16,
    entityHeight: number = 16
  ): LayerDrawer => {
    const buffer = document.createElement('canvas');
    buffer.width = entityWidth;
    buffer.height = entityHeight;
    const bufferContext = buffer.getContext('2d');

    return (context, camera) =>
      entities.forEach(entity => {
        bufferContext.clearRect(0, 0, entityWidth, entityHeight);

        entity.draw(bufferContext);

        context.drawImage(
          buffer,
          entity.pos.x - camera.pos.x,
          entity.pos.y - camera.pos.y
        )
      });
  }
export const createCollisionLayer =
  (entities: Set<Entity>, tileResolver: TileResolver): LayerDrawer => {
    const resolvedTiles = new Set<Vector>();
    const getByIndexOriginal = tileResolver.getByIndex;
    const tileSize = tileResolver.tileSize;

    tileResolver.getByIndex = (indexX, indexY) => {
      resolvedTiles.add(new Vector(indexX * tileSize, indexY * tileSize));

      return getByIndexOriginal.call(tileResolver, indexX, indexY);
    }

    return (context, camera) => {
      resolvedTiles.forEach(({ x, y }) => {
        drawCollision(
          context,
          'blue',
          x - camera.pos.x,
          y - camera.pos.y,
          tileSize);
      });

      resolvedTiles.clear();

      entities.forEach(({ pos, size }) => {
        drawCollision(
          context,
          'red',
          pos.x - camera.pos.x,
          pos.y - camera.pos.y,
          size.x,
          size.y
        );
      });
    }
  }
