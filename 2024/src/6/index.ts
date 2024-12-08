import { Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const dirs: {
  "^": ">";
  ">": "v";
  v: "<";
  "<": "^";
} = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
};

const moves = {
  "^": { x: 0, y: -1 },
  ">": { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
};
const getGuardPoint = (data: string[][], dir: "^" | ">" | "v" | "<") => {
  let x = 0;
  let y = 0;

  data.forEach((line, yIndex) => {
    if (line.includes(dir)) {
      x = line.findIndex((i) => i === dir);
      y = yIndex;
    }
  });

  return [x, y] as [number, number];
};

const moveGuard = (
  data: string[][],
  dir: "^" | ">" | "v" | "<",
  [x, y]: [number, number],
  visitedPoints: Set<string>
) => {
  const move = moves[dir];
  let nextX = x;
  let nextY = y;

  let moving = true;
  let inBoundary = true;

  while (moving && inBoundary) {
    visitedPoints.add(JSON.stringify({ x: nextX, y: nextY }));

    nextX += move.x;
    nextY += move.y;

    if (
      nextX === -1 ||
      nextX === data[0].length ||
      nextY === -1 ||
      nextY === data.length
    ) {
      inBoundary = false;
      break;
    }

    const nextPoint = data[nextY][nextX];
    if (nextPoint === "#") {
      nextX -= move.x;
      nextY -= move.y;
      moving = false;
      break;
    }
  }

  if (!inBoundary) {
    return visitedPoints;
  }

  return moveGuard(data, dirs[dir], [nextX, nextY], visitedPoints);
};

const moveGuardWithObstacles = (
  data: string[][],
  dir: "^" | ">" | "v" | "<",
  [x, y]: [number, number],
  visitedPoints: Set<string>
) => {
  const grid = new Grid(data);
  const move = moves[dir];
  let nextX = x;
  let nextY = y;

  let moving = true;
  let inBoundary = true;

  let notLooping = true;
  while (moving && inBoundary && notLooping) {
    const visitedPoint = JSON.stringify({ x: nextX, y: nextY, dir });

    if (visitedPoints.has(visitedPoint)) {
      notLooping = false;
      break;
    }
    visitedPoints.add(visitedPoint);

    nextX += move.x;
    nextY += move.y;

    if (!grid.getInBounds([nextX, nextY])) {
      inBoundary = false;
      break;
    }

    const nextPoint = data[nextY][nextX];
    if (nextPoint === "#") {
      nextX -= move.x;
      nextY -= move.y;
      moving = false;
      continue;
    }
  }

  if (!inBoundary) {
    return false;
  }

  if (!notLooping) {
    return true;
  }

  return moveGuardWithObstacles(data, dirs[dir], [nextX, nextY], visitedPoints);
};

export const exercise = (text: string, part: 1 | 2) => {
  const data = parse(text);
  const startPoint = getGuardPoint(data, "^");
  const visitedPoints = moveGuard(data, "^", startPoint, new Set<string>());

  if (part === 1) return visitedPoints.size;

  visitedPoints.delete(JSON.stringify({ x: startPoint[0], y: startPoint[1] }));

  return [...visitedPoints].reduce((acc, point) => {
    const newData = structuredClone(data);
    const { x, y } = JSON.parse(point);
    newData[y][x] = "#";

    return moveGuardWithObstacles(newData, "^", startPoint, new Set<string>())
      ? acc + 1
      : acc;
  }, 0);
};
