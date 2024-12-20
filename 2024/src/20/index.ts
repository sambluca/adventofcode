import { makePositive } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const moves: { [key: string]: Coord } = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

const getMinDistanceAndPath = (
  grid: Grid<string>,
  start: Coord,
  [eX, eY]: Coord
): Coord[] => {
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

  return finalPaths;
};

export const exercise = (
  text: string,
  minSeconds: number = 100,
  radius: number = 2
) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");
  const end = grid.getPoint("E");

  const paths = getMinDistanceAndPath(grid, start, end);

  const secondsToCoord = Object.fromEntries(
    paths.map((point, i) => [JSON.stringify(point), i])
  );

  let count = 0;
  for (const point of paths) {
    const [x, y] = point;
    const secondsFromEnd = secondsToCoord[JSON.stringify([x, y])];
    const validCheats = grid.getArea([x, y], radius);

    for (const [dX, dY] of validCheats) {
      const value = grid.getValue([dX, dY]);
      if (value === "." || value === "E") {
        const afterWallSecondsFromEnd =
          secondsToCoord[JSON.stringify([dX, dY])];
        // if we're further along in the path then we want to do more checks
        if (afterWallSecondsFromEnd > secondsFromEnd) {
          const fromX = makePositive(x - dX);
          const fromY = makePositive(y - dY);

          // secondsCheated is how many seconds it took to get from x,y to dX,dY
          const secondsCheated = fromX + fromY;

          const savedSeconds =
            afterWallSecondsFromEnd - (secondsFromEnd + secondsCheated);

          if (savedSeconds > 0 && savedSeconds >= minSeconds) {
            count += 1;
          }
        }
      }
    }
  }

  return count;
};
