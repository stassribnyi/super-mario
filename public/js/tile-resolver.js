export default class TileResolver {
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }

  toIndex(position) {
    return Math.floor(position / this.tileSize);
  }

  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY);

    if (!tile) {
      return undefined;
    }

    return {
      tile
    };
  }

  matchByPosition(positionX, positionY) {
    return this.getByIndex(this.toIndex(positionX), this.toIndex(positionY));
  }
}
