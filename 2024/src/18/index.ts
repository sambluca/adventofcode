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
  let finalScore = -1;
  const checks: {
    coord: Coord;
    score: number;
  }[] = [
    {
      coord: start,
      score: 0,
    },
  ];
  const visited = new Set<string>();

  while (checks.length !== 0) {
    const {
      coord: [x, y],
      score,
    } = checks.pop();

    if (x === eX && y === eY) {
      finalScore = score;
      break;
    }

    ["north", "south", "west", "east"].forEach((move) => {
      const [dX, dY] = moves[move];
      const nX = x + dX;
      const nY = y + dY;

      if (grid.getValue([nX, nY]) === "." && !visited.has(`${nX}-${nY}`)) {
        visited.add(`${nX}-${nY}`);
        checks.push({
          coord: [nX, nY],
          score: score + 1,
        });
      }
    });
    checks.sort((a, b) => b.score - a.score);
  }

  return finalScore;
};

export const exercise1 = (text: string, width: number, bytes: number) =>
  calculateScore(parse(text, width, bytes)[0], [0, 0], [width, width]);

export const exercise2 = (text: string, width: number, bytes: number) => {
  const [grid, c] = parse(text, width, bytes);
  const coords = c.slice(bytes, c.length - 1);

  let pathScore = 0;
  let badCoord: Coord = [0, 0];

  while (pathScore >= 0) {
    badCoord = coords.shift();
    grid.grid[badCoord[1]][badCoord[0]] = "#";

    pathScore = calculateScore(grid, [width, width], [0, 0]);
  }

  return badCoord;
};
