export type Coord = [number, number];

export class Grid {
  grid: any[][];
  constructor(grid: any[][]) {
    this.grid = grid;
  }

  getInBounds([x, y]: Coord) {
    if (x <= -1 || y <= -1) return false;
    if (y >= this.grid.length || x >= this.grid[0].length) return false;

    return true;
  }
}
