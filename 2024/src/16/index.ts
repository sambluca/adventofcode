import { Arr } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const moves: { [key: string]: Coord } = {
  north: [0, -1],
  east: [1, 0],
  south: [0, 1],
  west: [-1, 0],
};

const calculateScore = (grid: Grid<string>, start: Coord) => {
  let finalScore = 0;
  let found = false;
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

  const paths = new Arr([]);

  while (checks.length !== 0) {
    // we always want to check whatever the lowest score in the queue
    checks.sort((a, b) => b.score - a.score);

    const {
      coord: [x, y],
      dir,
      score,
      path,
    } = checks.pop()!;

    // if we're at the exit stop looping through. We know it's the lowest score because of the sort we did
    if (grid.getValue([x, y]) === "E" && !found) {
      found = true;
      finalScore = score;
      paths.push(...path.map((i) => JSON.stringify(i)));
      break;
    }

    // if we've already visited this coord in this direction it's already in the queue
    if (visited.has(`${x}-${y}-${dir}`)) continue;

    visited.add(`${x}-${y}-${dir}`);

    const [dX, dY] = moves[dir];
    const nX = x + dX;
    const nY = y + dY;

    // if we're not at a wall then that means we can continue moving in this direction
    if (grid.getValue([nX, nY]) !== "#") {
      checks.push({
        coord: [nX, nY],
        dir,
        score: score + 1,
        path: [...path, [nX, nY]],
      });
    }

    // if we're not at a wall then that means we can continue moving in this direction
    if (dir === "north" || dir === "south") {
      checks.push({ coord: [x, y], dir: "east", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "west", score: score + 1000, path });
    } else {
      // if we're east or west we want to check the north and south values
      checks.push({ coord: [x, y], dir: "south", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "north", score: score + 1000, path });
    }
  }

  return finalScore;
};

const getPaths = (grid: Grid<string>, start: Coord, lowestScore: number) => {
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
  const paths = new Arr([]);

  while (checks.length !== 0) {
    const {
      coord: [x, y],
      dir,
      score,
      path,
    } = checks.shift()!;

    // if the score is greater than the lowest score then this iteration isn't an optimal path
    if (score > lowestScore) continue;

    // if we've already checked this value in this direction AND it has a lower score set to it than the current iteration it's not an optimal path
    if (
      visited.has(`${x}-${y}-${dir}`) &&
      visited.get(`${x}-${y}-${dir}`) < score
    )
      continue;

    // when we get to here it means that the current iteration is the lowest score so far for this Coord in this direction so set it
    visited.set(`${x}-${y}-${dir}`, score);

    // if we're at the exit and the current score is the same as the lowest score then this is an optimal path, add it to the paths array and move on
    if (grid.getValue([x, y]) === "E" && score <= lowestScore) {
      paths.push(...path.map((i) => JSON.stringify(i)));
      continue;
    }

    const [dX, dY] = moves[dir];
    const nX = x + dX;
    const nY = y + dY;

    // if we're not at a wall then that means we can continue moving in this direction
    if (grid.getValue([nX, nY]) !== "#") {
      checks.push({
        coord: [nX, nY],
        dir,
        score: score + 1,
        path: [...path, [nX, nY]],
      });
    }

    // if we're north or south we want to check the east and west values
    if (dir === "north" || dir === "south") {
      checks.push({ coord: [x, y], dir: "east", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "west", score: score + 1000, path });
    } else {
      // if we're east or west we want to check the north and south values

      checks.push({ coord: [x, y], dir: "south", score: score + 1000, path });
      checks.push({ coord: [x, y], dir: "north", score: score + 1000, path });
    }
  }

  return paths.unique.length;
};

export const exercise1 = (text: string) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");

  return calculateScore(grid, start);
};

// score is the result of exercise 1
export const exercise2 = (text: string, score: number) => {
  const data = parse(text);
  const grid = new Grid(data);

  const start = grid.getPoint("S");

  return getPaths(grid, start, score);
};
