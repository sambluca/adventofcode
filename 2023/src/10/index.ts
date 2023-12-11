// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

interface PipeCheck {
  coords: [number, number];
  pipe: string;
}
const pipeMaps = {
  "|": ["up", "down"],
  "-": ["left", "right"],
  L: ["up", "right"],
  J: ["up", "left"],
  "7": ["down", "left"],
  F: ["down", "right"],
  S: ["up", "down", "left", "right"],
};

const connects = {
  up: ["|", "7", "F", "S"],
  down: ["|", "J", "L", "S"],
  left: ["-", "L", "F", "S"],
  right: ["-", "J", "7", "S"],
};

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

export const findStart = (data: Array<Array<string>>): [number, number] => {
  const coordinates: number[] = [];
  let i = 0;
  while (true) {
    const line = data[i];
    const indexS = line.indexOf("S");

    if (indexS !== -1 || i > data.length) {
      coordinates.push(i, indexS);
      break;
    }
    i += 1;
  }

  return [coordinates[0], coordinates[1]];
};

export const getNextValidPipe = (
  data: Array<Array<string>>,
  [x, y]: [number, number],
  pipeShape: string,
  [prevX, prevY]: [number, number]
): [[number, number], string] => {
  let nextCoords: [number, number];
  let nextPipe = "";
  const directions = pipeMaps[pipeShape];

  const rowAbove = data[x - 1] || [];
  const row = data[x] || [];
  const rowBelow = data[x + 1] || [];
  const pipesToCheck: {
    up: PipeCheck;
    down: PipeCheck;
    left: PipeCheck;
    right: PipeCheck;
  } = {
    up: { pipe: rowAbove[y], coords: [x - 1, y] },
    down: { pipe: rowBelow[y], coords: [x + 1, y] },
    left: { pipe: row[y - 1], coords: [x, y - 1] },
    right: { pipe: row[y + 1], coords: [x, y + 1] },
  };

  let i = 0;

  while (true) {
    const direction = directions[i];

    const { pipe, coords } = pipesToCheck[direction] || {
      pipe: "A",
      coords: [-1, -1],
    };
    const isLast = coords[0] === prevX && coords[1] === prevY;

    const checks = connects[direction];
    if (checks.indexOf(pipe) !== -1 && !isLast) {
      nextCoords = coords;
      nextPipe = pipe;
      break;
    }
    i += 1;
  }

  return [nextCoords, nextPipe];
};

export const buildValidPath = (
  d: Array<Array<string>>,
  [startX, startY]: [number, number]
) => {
  const [...data] = d;
  const start: [number, number] = [startX, startY];
  const validPath: [number, number][] = [];
  const [[x, y], firstPipe] = getNextValidPipe(data, start, "S", [
    startX,
    startY,
  ]);
  validPath.push([x, y]);

  let prevPipeCoords: [number, number] = [startX, startY];

  let nextPipeCoords: [number, number] = [x, y];
  let nextPipeShape = firstPipe;

  while (true) {
    const [nextX, nextY] = nextPipeCoords;
    data[nextX][nextY] = "🟥";

    const [nPC, nPS] = getNextValidPipe(
      data,
      nextPipeCoords,
      nextPipeShape,
      prevPipeCoords
    );
    prevPipeCoords = nextPipeCoords;
    validPath.push(nPC);
    nextPipeCoords = nPC;
    nextPipeShape = nPS;

    if (nPC[0] === startX && nPC[1] === startY) break;
  }

  return validPath;
};
export const exercise1 = (text: string) => {
  const data = parse(text);
  const start = findStart(data);
  const paths = buildValidPath(data, start);

  return paths.length / 2;
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  const start = findStart(data);
  const paths = buildValidPath(data, start);

  // All this should be extracted to it's own helper functions BUT
  // a vague memory from A-Level/Uni led to lots of googling has led me to this -- shoelace formula and picks theorem

  // Shoelace formula -- https://www.101computing.net/the-shoelace-algorithm
  // The shoelace formula is a mathematical algorithm to determine the area of a simple polygon whose vertices are described by their Cartesian coordinates in the plane.
  // find areaX --- (Xa * Yb) + (Xb * Yc) + (Xc * Ya)
  const areaX = paths.reduce((acc, curr, i) => {
    const compare = paths[i + 1] || paths[0];
    return acc + curr[0] * compare[1];
  }, 0);

  // find areaY--- (Ya * Xb) + (Yb * Xc) + (Yc * Xa)
  const areaY = paths.reduce((acc, curr, i) => {
    const compare = paths[i + 1] || paths[0];

    return acc + curr[1] * compare[0];
  }, 0);

  // minus them from each other
  const areaAll = areaX - areaY;
  // divide by half
  const area = 0.5 * areaAll;

  // this area is the area of the polygon that is the Maze that paths creates

  // Picks theorom -- https://artofproblemsolving.com/wiki/index.php/Pick%27s_Theorem
  // Pick's Theorem expresses the area of a polygon, all of whose vertices are lattice points in a coordinate plane, in terms of the number of lattice points inside the polygon and the number of lattice points on the sides of the polygon
  // Area = InteriorPoints + \ 0.5BoundaryPoints - 1
  // We know the area, we know the number of boundary points
  // Simple equation rearraging leads to this
  const res = area + 1 - 0.5 * paths.length;

  return res;
};
