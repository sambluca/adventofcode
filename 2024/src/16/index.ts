import { Arr } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const flood = (
  grid: Grid<string>,
  [x, y]: Coord,
  search: string,
  replaced: Coord[],
  edges: Set<string>,
  [prevX, prevY]: Coord,
  dir?: "north" | "south" | "east" | "west"
): [Coord[], Set<string>] => {
  // if we're out of bounds we're at at an edge
  if (!grid.getInBounds([x, y])) {
    edges.add(`${search}-${prevX}-${prevY}-${dir}`);
    return [replaced, edges];
  }

  // if we've already found the value then we're not hitting an edge
  if (replaced.find(([rX, rY]) => rX === x && rY === y))
    return [replaced, edges];

  // if the grid value doesn't equal the value we're searching for we've hit an internal edge
  if (grid.grid[y][x] !== search) {
    edges.add(`${search}-${prevX}-${prevY}-${dir}`);
    return [replaced, edges];
  }

  replaced.push([x, y]);
  grid.grid[y][x] = "o";
  // grid.grid[y][x] = "v";

  const {
    north: { coord: north },
    south: { coord: south },
    west: { coord: west },
    east: { coord: east },
  } = grid.getSurroundingValues([x, y]);

  replaced = flood(grid, north, search, replaced, edges, [x, y], "north")[0];
  replaced = flood(grid, south, search, replaced, edges, [x, y], "south")[0];
  replaced = flood(grid, west, search, replaced, edges, [x, y], "west")[0];
  replaced = flood(grid, east, search, replaced, edges, [x, y], "east")[0];

  return [replaced, edges];
};

const moves: { [key: string]: Coord } = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

const calculateScore = (grid: Grid<string>, start: Coord) => {
  let finalScore = 0;

  const checks: {
    coord: Coord;
    dir: "north" | "south" | "west" | "east";
    score: number;
  }[] = [
    {
      coord: start,
      dir: "east",
      score: 0,
    },
  ];
  const visited = new Set<string>();

  while (checks.length !== 0) {
    checks.sort((a, b) => a.score - b.score);

    const {
      coord: [x, y],
      dir,
      score,
    } = checks.shift()!;

    const key = `${x}-${y}-${dir}`;

    if (grid.getValue([x, y]) === "E") {
      finalScore = score;
      break;
    }

    if (visited.has(key)) continue;

    visited.add(key);

    const [dX, dY] = moves[dir];
    const nX = x + dX;
    const nY = y + dY;

    if (grid.getValue([nX, nY]) !== "#") {
      checks.push({
        coord: [nX, nY],
        dir,
        score: score + 1,
      });
    }

    if (dir === "north" || dir === "south") {
      checks.push({ coord: [x, y], dir: "east", score: score + 1000 });
      checks.push({ coord: [x, y], dir: "west", score: score + 1000 });
    } else {
      checks.push({ coord: [x, y], dir: "south", score: score + 1000 });
      checks.push({ coord: [x, y], dir: "north", score: score + 1000 });
    }
  }

  return finalScore;
};

const getPaths = (grid: Grid<string>, start: Coord, lowestScore: number) => {
  // let finalScore = 0;

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
  const visited = new Map<string, number>();
  const paths: Coord[][] = [];

  while (checks.length !== 0) {
    checks.sort((a, b) => a.score - b.score);

    const {
      coord: [x, y],
      dir,
      score,
      path,
    } = checks.shift()!;

    const key = `${x}-${y}-${dir}`;

    if (score > lowestScore) continue;
    if (visited.has(key) && visited.get(key)! < score) continue;
    visited.set(key, score);

    if (grid.getValue([x, y]) === "E" && score === lowestScore) {
      paths.push(path);
      continue;
    }

    const [dX, dY] = moves[dir];
    const nX = x + dX;
    const nY = y + dY;

    if (grid.getValue([nX, nY]) !== "#") {
      checks.push({
        coord: [nX, nY],
        dir,
        score: score + 1,
        path: [...path, [nX, nY]],
      });
    }

    if (dir === "north" || dir === "south") {
      checks.push({ coord: [x, y], dir: "east", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "west", score: score + 1000, path });
    } else {
      checks.push({ coord: [x, y], dir: "south", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "north", score: score + 1000, path });
    }
  }

  return new Arr(paths.flat()).map((i) => JSON.stringify(i)).unique;
};

export const exercise1 = (text: string) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");

  return calculateScore(grid, start);
};

export const exercise2 = (text: string, score: number) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");

  return getPaths(grid, start, score).length;
};
