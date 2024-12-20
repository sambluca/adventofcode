import { Grid } from "../Grid";

describe("Grid", () => {
  describe("getArea", () => {
    test("all values in grid", () => {
      const grid = new Grid<string>(
        Array.from(Array(15), () => new Array(15).fill("⬛️"))
      );

      const res = grid.getArea([7, 7], 5);

      res.forEach(([x, y]) => {
        grid.grid[y][x] = "🟨";
      });

      //   grid.print();

      expect(res).toHaveLength(60);
    });

    test.only("all values in grid", () => {
      const grid = new Grid<string>(
        Array.from(Array(15), () => new Array(15).fill("⬛️"))
      );

      const res = grid.getArea([0, 0], 5);

      res.forEach(([x, y]) => {
        grid.grid[y][x] = "🟨";
      });

      //   grid.print();

      expect(res).toHaveLength(20);
    });
  });
});
