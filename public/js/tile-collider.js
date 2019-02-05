import TileResolver from './tile-resolver.js';

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkY(entity) {
    const match = this.tiles.matchByPosition(
      entity.positionVector.x,
      entity.positionVector.y
    );

    if (!match) {
      return;
    }

    if (match.tile.name !== 'ground') {
      return;
    }

    if (entity.velocityVector.y > 0) {
      if (entity.positionVector.y > match.y1) {
        entity.positionVector.y = match.y1;
        entity.velocityVector.y = 0;
      }
    }
  }

  test(entity) {
    this.checkY(entity);

    const match = this.tiles.matchByPosition(
      entity.positionVector.x,
      entity.positionVector.y
    );

    if (match) {
      console.log('Matched tile', match, match.tile);
    }
  }
}
