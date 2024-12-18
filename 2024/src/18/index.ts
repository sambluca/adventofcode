import { Coord, Grid } from "../utils/Grid";

export const parse = (
  text: string,
  width: number,
  bytes: number
): [Grid<string>, Coord[]] => {
  const coords: Coord[] = text
    .split(/\n/)
    .map((line) => line.split(",").map(Number) as Coord);

  const grid = new Grid<string>(
    Array.from(Array(width + 1), () => new Array(width + 1).fill("."))
  );

  for (let i = 0; i < bytes; i++) {
    const [x, y] = coords[i];
    grid.grid[y][x] = "#";
  }

  return [grid, coords];
};

const moves: { [key: string]: Coord } = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

const calculateScore = (grid: Grid<string>, start: Coord, [eX, eY]: Coord) => {
  let finalPaths: Coord[] = [];
  const checks: {
    coord: Coord;
    dir: "north" | "south" | "west" | "east";
    score: number;
    path: Coord[];
  }[] = [
    {
      coord: start,
      dir: "east",
      score: 0,
      path: [start],
    },
  ];
  const visited = new Set<string>();

  while (checks.length !== 0) {
    const {
      coord: [x, y],
      dir,
      score,
      path,
    } = checks.pop();

    if (x === eX && y === eY) {
      finalPaths = path;
      break;
    }

    if (visited.has(`${x}-${y}-${dir}`)) continue;

    visited.add(`${x}-${y}-${dir}`);

    const [dX, dY] = moves[dir];
    const nX = x + dX;
    const nY = y + dY;

    if (grid.getValue([nX, nY]) !== "#" && grid.getInBounds([nX, nY])) {
      checks.push({
        coord: [nX, nY],
        dir,
        score: score + 1,
        path: [...path, [nX, nY]],
      });
    }

    if (grid.getInBounds([x, y])) {
      Object.keys(moves)
        .filter((move) => move !== dir)
        .forEach((move: "north" | "south" | "west" | "east") => {
          checks.push({
            coord: [x, y],
            dir: move,
            score: score + 1,
            path,
          });
        });
    }
    checks.sort((a, b) => b.score - a.score);
  }

  return finalPaths.length - 1;
};

export const exercise1 = (text: string, width: number, bytes: number) =>
  calculateScore(parse(text, width, bytes)[0], [0, 0], [width, width]);

export const exercise2 = (text: string, width: number, bytes: number) => {
  const [grid, c] = parse(text, width, bytes);
  const coords = c.slice(bytes, c.length - 1);

  let pathScore = 0;
  let badCoord: Coord = [0, 0];

  // let i = bytes;
  while (pathScore >= 0) {
    badCoord = coords.shift();
    grid.grid[badCoord[1]][badCoord[0]] = "#";

    pathScore = calculateScore(grid, [width, width], [0, 0]);
  }

  return badCoord;
};
