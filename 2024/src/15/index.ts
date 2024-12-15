import { Coord, Grid } from "../utils/Grid";

export const parse = (
  text: string,
  part2: boolean = false
): [string[][], (">" | "<" | "^" | "v")[]] => {
  const [g, i] = text.split(/\n\n/);
  const convertGrid = (nG) => nG.split("\n").map((x) => x.split(""));
  const nG = g
    .replaceAll("#", "##")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
    .replaceAll("O", "[]");
  const grid = convertGrid(part2 ? nG : g);
  const instructions = i.split("").filter((i) => i !== "\n") as unknown as (
    | ">"
    | "<"
    | "^"
    | "v"
  )[];

  return [grid, instructions];
};

const moves: { [key: string]: Coord } = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const getBoulders = (
  grid: Grid<string>,
  [cX, cY]: Coord,
  [mX, mY]: Coord,
  boulders: Coord[]
) => {
  const nextValue = grid.getValue([cX, cY]);

  if (nextValue === "#") return [];
  if (nextValue === ".") {
    return boulders;
  }

  boulders.push([cX, cY]);

  return getBoulders(grid, [cX + mX, cY + mY], [mX, mY], boulders);
};

const sumBoulders = (acc, [x, y]) => acc + (100 * y + x);

export const exercise1 = (text: string) => {
  const [g, instructions] = parse(text);
  const grid = new Grid(g);

  while (instructions.length !== 0) {
    const instruction = instructions.shift();

    const [mX, mY] = moves[instruction];
    const [x, y] = grid.getPoint("@");
    const [nX, nY] = [x + mX, y + mY] as Coord;
    const nextValue = grid.getValue([nX, nY]);

    if (nextValue === "#") continue;

    if (nextValue === ".") {
      grid.grid[y][x] = ".";
      grid.grid[nY][nX] = "@";

      continue;
    }

    if (nextValue === "O") {
      const bouldersToMove = getBoulders(grid, [nX, nY], [mX, mY], []);
      bouldersToMove.forEach(([bX, bY]) => {
        grid.grid[bY + mY][bX + mX] = "O";
      });
      if (bouldersToMove.length !== 0) {
        grid.grid[y][x] = ".";
        grid.grid[nY][nX] = "@";
      }
    }
  }

  return grid.getAllPoints("O").reduce(sumBoulders, 0);
};

const getLargeBoulders = (
  grid: Grid<string>,
  [cX, cY]: Coord,
  [mX, mY]: Coord,
  b: { left: Coord; right: Coord }[],
  dir: ">" | "<" | "^" | "v"
) => {
  let boulders = [...b];
  const nextValue = grid.getValue([cX, cY]);

  if (nextValue === "#") return [];
  if (nextValue === ".") {
    return boulders;
  }

  if (dir === "<") {
    const left = [cX + mX, cY] as Coord;
    const right = [cX, cY] as Coord;

    boulders.push({ right, left });
    const move = mX * 2;
    // console.log("cX", cX);
    // console.log("cX - 2", cX - 2);

    // console.log("cX - move", cX + move);

    // console.log(cX);

    // console.log(cX - move);
    // console.log(cX - 2);

    return getLargeBoulders(grid, [cX + move, cY], [mX, mY], boulders, dir);
  }

  if (dir === ">") {
    const left = [cX, cY] as Coord;
    const right = [cX + 1, cY] as Coord;

    boulders.push({ right, left });
    return getLargeBoulders(grid, [cX + 2, cY], [mX, mY], boulders, dir);
  }

  if (dir === "^") {
    const middle = [cX, cY] as Coord;
    const left = [cX - 1, cY] as Coord;
    const right = [cX + 1, cY] as Coord;

    const mV = grid.getValue(middle);

    if (mV === "[") {
      boulders.push({ left: middle, right });

      boulders = getLargeBoulders(grid, [cX, cY - 1], [mX, mY], boulders, dir);
      if (boulders.length === 0) return [];
      return getLargeBoulders(grid, [cX + 1, cY - 1], [mX, mY], boulders, dir);
    }

    if (mV === "]") {
      boulders.push({ right: middle, left });

      boulders = getLargeBoulders(grid, [cX, cY + mY], [mX, mY], boulders, dir);
      if (boulders.length === 0) return [];

      return getLargeBoulders(grid, [cX - 1, cY + mY], [mX, mY], boulders, dir);
    }
  }

  if (dir === "v") {
    const middle = [cX, cY] as Coord;
    const left = [cX - 1, cY] as Coord;
    const right = [cX + 1, cY] as Coord;

    const lV = grid.getValue(left);
    const mV = grid.getValue(middle);
    const rV = grid.getValue(right);

    if (mV === "[") {
      boulders.push({ left: middle, right });

      boulders = getLargeBoulders(grid, [cX, cY + 1], [mX, mY], boulders, dir);
      if (boulders.length === 0) return [];

      return getLargeBoulders(grid, [cX + 1, cY + 1], [mX, mY], boulders, dir);
    }

    if (mV === "]") {
      boulders.push({ right: middle, left });

      boulders = getLargeBoulders(grid, [cX, cY + mY], [mX, mY], boulders, dir);
      if (boulders.length === 0) return [];

      return getLargeBoulders(grid, [cX - 1, cY + mY], [mX, mY], boulders, dir);
    }
  }
  return getLargeBoulders(grid, [cX + mX, cY + mY], [mX, mY], boulders, dir);
};

export const exercise2 = (text: string) => {
  const [g, instructions] = parse(text, true);
  const grid = new Grid(g);

  while (instructions.length !== 0) {
    const instruction = instructions.shift();

    const [mX, mY] = moves[instruction];
    const [x, y] = grid.getPoint("@");
    const [nX, nY] = [x + mX, y + mY] as Coord;
    const nextValue = grid.getValue([nX, nY]);

    if (nextValue === "[" || nextValue === "]" || instruction === "^") {
      const bouldersToMove = getLargeBoulders(
        grid,
        [nX, nY],
        [mX, mY],
        [],
        instruction
      );

      if (instruction === "<" || instruction === ">")
        bouldersToMove.forEach(({ left: [lX, lY], right: [rX, rY] }) => {
          grid.grid[lY + mY][lX + mX] = "[";
          grid.grid[rY + mY][rX + mX] = "]";
        });

      if (instruction === "^") {
        bouldersToMove
          .sort(({ right: [aX, aY] }, { right: [bX, bY] }) =>
            aY > bY ? 1 : -1
          )
          .forEach(({ left: [lX, lY], right: [rX, rY] }) => {
            grid.grid[lY][lX] = ".";
            grid.grid[rY][rX] = ".";

            grid.grid[lY + mY][lX + mX] = "[";
            grid.grid[rY + mY][rX + mX] = "]";
          });
      }

      if (instruction === "v") {
        bouldersToMove
          .sort(({ right: [aX, aY] }, { right: [bX, bY] }) =>
            aY < bY ? 1 : -1
          )
          .forEach(({ left: [lX, lY], right: [rX, rY] }) => {
            grid.grid[lY][lX] = ".";
            grid.grid[rY][rX] = ".";

            grid.grid[lY + mY][lX + mX] = "[";
            grid.grid[rY + mY][rX + mX] = "]";
          });
      }

      if (bouldersToMove.length !== 0) {
        grid.grid[y][x] = ".";
        grid.grid[nY][nX] = "@";
      }
    }
    if (nextValue === "#") continue;

    if (nextValue === ".") {
      grid.grid[y][x] = ".";
      grid.grid[nY][nX] = "@";

      continue;
    }
  }

  const width = grid.grid[0].length;
  return grid
    .getAllPoints("[")
    .map(([x, y]) => (x >= width ? [x + 1, y] : [x, y]))
    .reduce(sumBoulders, 0);
};
