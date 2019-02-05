import TileResolver from './tile-resolver.js';

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  test(entity) {
    const match = this.tiles.matchByPosition(
      entity.positionVector.x,
      entity.positionVector.y
    );

    if (match) {
      console.log('Matched tile', match, match.tile);
    }
  }
}
