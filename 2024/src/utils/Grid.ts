export type Coord = [number, number];

type Value = string | number;
interface Surrounding {
  north: { value: Value; coord: Coord };
  northEast: { value: Value; coord: Coord };
  east: { value: Value; coord: Coord };
  southEast: { value: Value; coord: Coord };
  south: { value: Value; coord: Coord };
  southWest: { value: Value; coord: Coord };
  west: { value: Value; coord: Coord };
  northWest: { value: Value; coord: Coord };
}

export class Grid {
  grid: Array<Value>[];
  constructor(grid: Array<Value>[]) {
    this.grid = grid;
  }

  static get [Symbol.species]() {
    return Grid;
  }

  valueOf() {
    return this.grid;
  }

  getInBounds([x, y]: Coord) {
    if (x <= -1 || y <= -1) return false;
    if (y >= this.grid.length || x >= this.grid[0].length) return false;

    return true;
  }

  getPoint<T extends Value>(check: T) {
    let foundX = 0;
    let foundY = 0;

    this.grid.forEach((line, yIndex) => {
      if (line.includes(check)) {
        foundX = line.findIndex((i) => i === check);
        foundY = yIndex;
      }
    });

    return [foundX, foundY] as Coord;
  }

  getValue([x, y]: Coord) {
    if (this.getInBounds([x, y])) {
      return this.grid[y][x];
    }

    return undefined;
  }

  getAllPoints<T extends Value>(check: T) {
    const points: Coord[] = [];
    this.grid.forEach((line, yIndex) => {
      if (line.includes(check)) {
        line.forEach((value, xIndex) => {
          if (value === check) {
            points.push([xIndex, yIndex]);
          }
        });
      }
    });

    return points;
  }

  getSurroundingValues([x, y]: Coord): Surrounding {
    const north: Coord = [x, y - 1];
    const northEast: Coord = [x + 1, y - 1];
    const east: Coord = [x + 1, y];
    const southEast: Coord = [x + 1, y + 1];
    const south: Coord = [x, y + 1];
    const southWest: Coord = [x - 1, y + 1];
    const west: Coord = [x - 1, y];
    const northWest: Coord = [x - 1, y - 1];

    return {
      north: { value: this.getValue(north), coord: north },
      northEast: { value: this.getValue(northEast), coord: northEast },
      east: { value: this.getValue(east), coord: east },
      southEast: { value: this.getValue(southEast), coord: southEast },
      south: { value: this.getValue(south), coord: south },
      southWest: { value: this.getValue(southWest), coord: southWest },
      west: { value: this.getValue(west), coord: west },
      northWest: { value: this.getValue(northWest), coord: northWest },
    };
  }
}
