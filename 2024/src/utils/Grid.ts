export type Coord = [number, number];

export class Grid {
  grid: string[][];
  constructor(grid: string[][]) {
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

  getPoint<T extends string>(check: T) {
    let foundX = 0;
    let foundY = 0;

    this.grid.forEach((line, yIndex) => {
      if (line.includes(check)) {
        foundX = line.findIndex((i) => i === check);
        foundY = yIndex;
      }
    });

    return [foundX, foundY] as [number, number];
  }
}
