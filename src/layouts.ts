import Camera from './camera.js';
import { LayerDrawer } from './compositor.js';
import Entity from './entity.js';
import Level, { LevelTile } from './level.js';
import { Matrix, Vector } from './math.js';
import SpriteSheet from './sprite-sheet.js';
import TileResolver from './tile-resolver.js';

function drawRect(
  context: CanvasRenderingContext2D,
  color: CanvasRenderingContext2D['strokeStyle'],
  x: number, y: number,
  size: number
): void;
function drawRect(
  context: CanvasRenderingContext2D,
  color: CanvasRenderingContext2D['strokeStyle'],
  x: number, y: number,
  width: number, height: number
): void;
function drawRect(
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
  level: Level,
  tileResolver: TileResolver,
  sprites: SpriteSheet
): LayerDrawer => {
  const tiles = tileResolver.getTiles();
  const buffer = document.createElement('canvas');
  buffer.width = 256 + 16;
  buffer.height = 240;
  const bufferContext = buffer.getContext('2d');

  let startIndex: number;
  let endIndex: number;
  const redraw = (drawFrom: number, drawTo: number): void => {
    // if (startIndex === drawFrom && endIndex === drawTo) {
    //   return;
    // }

    startIndex = drawFrom;
    endIndex = drawTo;
    console.log('redrawing');

    for (let x = startIndex; x <= endIndex; x++) {
      const col = tiles.grid[x];
      if (!col) {
        continue;
      }

      col.forEach((tile, y) => {
        if (sprites.hasAnimation(tile.name)) {
          sprites.drawAnimation(tile.name, bufferContext, x - startIndex, y, level.getTotalTime());

          return;
        }

        sprites.drawTile(tile.name, bufferContext, x - startIndex, y);
      })
    }
  }

  return (context, camera) => {
    const drawWidth = tileResolver.toIndex(camera.size.x);
    const drawFrom = tileResolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;

    redraw(drawFrom, drawTo);

    context.drawImage(buffer, -camera.pos.x % tileResolver.tileSize, -camera.pos.y);
  }
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
  };

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
        drawRect(
          context,
          'blue',
          x - camera.pos.x,
          y - camera.pos.y,
          tileSize);
      });

      resolvedTiles.clear();

      entities.forEach(({ pos, size }) => {
        drawRect(
          context,
          'red',
          pos.x - camera.pos.x,
          pos.y - camera.pos.y,
          size.x,
          size.y
        );
      });
    }
  };

export const createCameraLayer =
  (cameraToDraw: Camera): LayerDrawer => (context, fromCamera) => {
    drawRect(
      context,
      'purple',
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y);

  }
