import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const moves: { [key: string]: Coord } = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

// needs to be moved to a helper file
const getMinDistanceAndPath = (
  grid: Grid<string>,
  start: Coord,
  [eX, eY]: Coord
): [number, Coord[]] => {
  let finalScore = -1;
  let finalPaths: Coord[] = [];
  const checks: {
    coord: Coord;
    score: number;
    paths: Coord[];
  }[] = [
    {
      coord: start,
      score: 0,
      paths: [start],
    },
  ];
  const visited = new Set<string>();

  while (checks.length !== 0) {
    const {
      coord: [x, y],
      score,
      paths,
    } = checks.pop();

    if (x === eX && y === eY) {
      finalScore = score;
      finalPaths = paths;
      break;
    }

    ["north", "south", "west", "east"].forEach((move) => {
      const [dX, dY] = moves[move];
      const nX = x + dX;
      const nY = y + dY;

      if (grid.getValue([nX, nY]) !== "#" && !visited.has(`${nX}-${nY}`)) {
        visited.add(`${nX}-${nY}`);
        checks.push({
          coord: [nX, nY],
          score: score + 1,
          paths: [...paths, [nX, nY]],
        });
      }
    });
    checks.sort((a, b) => b.score - a.score);
  }

  return [finalScore, finalPaths];
};

export const exercise1 = (text: string, minSeconds: number = 100) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");
  const end = grid.getPoint("E");

  grid.grid[end[1]][end[0]] = ".";
  const [score, paths] = getMinDistanceAndPath(grid, start, end);

  const steps = Object.fromEntries(
    paths.map((point, i) => [JSON.stringify(point), i])
  );

  const d = (v: number) => v * 2;

  const shorcutCount: { [key: string]: number } = {};
  for (const point of paths) {
    const [x, y] = point;
    const stepsFromEnd = steps[JSON.stringify([x, y])];
    for (const [dX, dY] of Object.values(moves)) {
      if (grid.getValue([x + dX, y + dY]) === "#") {
        const afterWall = [x + d(dX), y + d(dY)] as Coord;
        const afterWallStepsFromEnd =
          steps[JSON.stringify([afterWall[0], afterWall[1]])];
        const savedSteps = afterWallStepsFromEnd - stepsFromEnd - 2;

        if (!shorcutCount[savedSteps]) shorcutCount[savedSteps] = 0;

        shorcutCount[savedSteps]++;
      }
    }
  }

  console.log(shorcutCount);
  return Object.entries(shorcutCount)
    .filter(([key]) => Number(key) > 0 && Number(key) >= minSeconds)
    .reduce((acc: number, [, value]) => acc + value, 0);
};

export const exercise2 = (text: string) => {
  const data = parse(text);
};
