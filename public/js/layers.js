function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

export function createBackgroundLayer(background, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  background.forEach(background =>
    drawBackground(background, buffer.getContext('2d'), sprites)
  );

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach(entity => entity.draw(context));
  };
}
