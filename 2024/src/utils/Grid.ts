export type Coord = [number, number];
interface Surrounding<T> {
  north: { value: T; coord: Coord };
  northEast: { value: T; coord: Coord };
  east: { value: T; coord: Coord };
  southEast: { value: T; coord: Coord };
  south: { value: T; coord: Coord };
  southWest: { value: T; coord: Coord };
  west: { value: T; coord: Coord };
  northWest: { value: T; coord: Coord };
}

export class Grid<V extends string | number> {
  grid: Array<V>[];
  constructor(grid: Array<V>[]) {
    this.grid = grid;
  }

  static get [Symbol.species]() {
    return Grid;
  }

  print() {
    console.log(this.grid.map((i) => i.join("")).join("\n"));
  }

  // copy to clipboard
  copy() {
    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(this.grid.map((i) => i.join("")).join("\n"));
    proc.stdin.end();
  }
  valueOf() {
    return this.grid;
  }

  getInBounds([x, y]: Coord) {
    if (x <= -1 || y <= -1) return false;
    if (y >= this.grid.length || x >= this.grid[0].length) return false;

    return true;
  }

  getPoint<T extends V>(check: T) {
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

  getAllPoints<T extends V>(check: T) {
    const points: Coord[] = [];
    this.grid.forEach((line, yIndex) => {
      line.forEach((value, xIndex) => {
        if (value === check) {
          points.push([xIndex, yIndex]);
        }
      });
    });

    return points;
  }

  getSurroundingValues([x, y]: Coord): Surrounding<V> {
    const north: Coord = [x, y - 1];
    const east: Coord = [x + 1, y];
    const south: Coord = [x, y + 1];
    const west: Coord = [x - 1, y];

    const northEast: Coord = [x + 1, y - 1];
    const southEast: Coord = [x + 1, y + 1];
    const southWest: Coord = [x - 1, y + 1];
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
